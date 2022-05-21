$(function () {
    const form = layui.form;
    const layer = layui.layer;
    // 自定义校验规则
    form.verify({
        nickname: val => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        }
    })

    // 获取用户基本信息
    const initUserInfo = () => {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success: res => {
                if (res.status !== 0) return layer.msg(res.message);
                // layer.msg(res.message);
                form.val('formUserInfo', res.data);

            }
        })
    }

    initUserInfo();

    // 重置
    $('#btnReset').click((e) => {
        e.preventDefault();
        initUserInfo();
    })

    // 更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                window.parent.getUserInfo();
            }
        })
    })
})