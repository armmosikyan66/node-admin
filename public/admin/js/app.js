$(document).ready(function (e) {
    if (localStorage.getItem("refreshToken")) {
        $.ajax({
            url: '/api/refresh',
            method: 'GET',
            beforeSend: function (xhr) {
                const token = localStorage.getItem("refreshToken");
                xhr.setRequestHeader("Authorization", `Bearer ${token}`);
            },
            success: function (response) {
                $(".admin_name_lbl").text(`${response.user.firstName} ${response.user.lastName}`)
                localStorage.setItem("refreshToken", response.refreshToken);
                if (window.location.href.indexOf("login") !== -1) {
                    window.location.href = "/admin";
                }
            },
            error: function () {
                // localStorage.clear();
                // window.location.href = "/admin/login";
            },
        });
    }
})