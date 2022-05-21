$(function () {
    getUserInfo();

    const layer = layui.layer;
    // 退出功能
    $('#btnLogout').click(() => {
        layer.confirm('确认是否退出', { icon: 3, title: '' }, (index) => {
            localStorage.removeItem('token');
            location.href = '/login.html';
        })
    })
})

const layer = layui.layer;

// 获取用户信息
function getUserInfo () {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token'),
        // },
        success: res => {
            if (res.status !== 0) return layer.msg(res.message);
            // layer.msg(res.message);
            // console.log(res.data);
            renderAvatar(res.data);
        },
        // 不论成功还是失败 都会调用这个函数
        // complete: (res) => {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    })
}

// 渲染头像函数
const renderAvatar = (user) => {
    // 获取名字
    let name = user.nickname || user.username;
    $('#welcome').html(`欢迎 ${name}`);
    // 获取头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        let firstName = name[0].toUpperCase();
        $('.text-avatar').html(firstName).show();
    }
}