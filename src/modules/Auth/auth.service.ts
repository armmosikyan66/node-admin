import {ALREADY_EXISTS, INVALID, NOT_EXISTS, USER_ROLES} from "../../config/constants";
import UserRepository from "../../repositories/user.repository";
import {BadRequest, NotFound} from "../../config/errors";
import TokenRepository from "../../repositories/token.repository";
import {compare, genSalt, hash} from "bcrypt";
import {v4} from "uuid";
import {IUser} from "../../types/IUser";
import MailerRepository from "../../repositories/mailer.repository";
import {apiUrl} from "../../config";
import UserDto from "../../database/dto/UserDto";

interface IAuth {
    user: UserDto,
    refreshToken: string;
    accessToken: string;
}

const userRepo = new UserRepository();
const tokenRepo = new TokenRepository();
const mailerRepo = new MailerRepository();

class AuthService {
    static async registration(email: string, password: string, phoneNumber: string, firstName: string, lastName: string, role: typeof USER_ROLES[keyof typeof USER_ROLES] = USER_ROLES.BASIC): Promise<{success: true}> {
        const candidate = await userRepo.findOne({email});

        if (candidate) {
            throw new NotFound(ALREADY_EXISTS(`User with this ${email}`));
        }

        const salt: string = await genSalt(6);
        const hashedPassword: string = await hash(password, salt);
        const activationLink: string = v4();

        const user: IUser = await userRepo.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phoneNumber,
            activationLink,
            role
        });

        await tokenRepo.saveToken({user: user._id, refreshToken: ""})
        await mailerRepo.sendActivationMail(
            email,
            `${apiUrl}/api/activate/${activationLink}`
        );

        return {
            success: true
        };
    }

    static async login(email: string, password: string): Promise<IAuth> {
        const candidate: IUser | null = await userRepo.findOne({ email });

        if (!candidate) {
            throw new NotFound(NOT_EXISTS(`User with ${email}`));
        }

        const isPassEquals = await compare(password, candidate.password);

        if (!isPassEquals) {
            throw new BadRequest(INVALID("Password"));
        }

        const tokens = tokenRepo.generateTokens(JSON.parse(JSON.stringify(candidate)));

        await tokenRepo.findAndModify({user: candidate._id}, { token: tokens.refreshToken })

        return {
            ...tokens,
            user: new UserDto(candidate)
        }
    }

    static async refresh(user: IUser): Promise<IAuth> {
        const tokens = tokenRepo.generateTokens(JSON.parse(JSON.stringify(user)));
        await tokenRepo.findAndModify({user: user._id}, { token: tokens.refreshToken })

        return {
            ...tokens,
            user: new UserDto(user),
        }
    }

    static async logout(user?: IUser): Promise<{success: true}> {
        const candidate = await userRepo.findOne({ _id: user?._id });

        if (!candidate) {
            throw new NotFound(NOT_EXISTS("User"));
        }

        await tokenRepo.findAndModify({user: candidate._id}, { token: '' })

        return {
            success: true,
        }
    }
}

export default AuthService;