// 模拟角色切换与工单提交
function changeRole() {
    const role = document.getElementById('role-select').value;
    console.log('当前切换身份为:', role);
    // 后续可根据角色动态渲染页面权限
}

function submitTicket() {
    const target = document.getElementById('target-role').value;
    document.getElementById('ticket-msg').innerText = '工单已提交！等待上级处理...';
    console.log('提交跨级工单，目标权限:', target);
}
