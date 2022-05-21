$(function () {
    // const baseUrl = `http://www.liulongbin.top:3007`;

    // 点击切换效果
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').click(() => {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 获取form
    const form = layui.form;

    // 定义表单验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        rePwd: (val) => {
            const pwd = $('.reg-box [name=password]').val();
            if (val !== pwd) return '两次密码不一致!';
        }
    })

    const layer = layui.layer;

    // 注册事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                // console.log(res);
                $('#link_login').click();
            }
        })
    })

    // 登录事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg(res.message);
                // layer.msg(res.message);
                // console.log(res);
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})