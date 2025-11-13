// 移动端JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 日期滚动选择
    const dateScroll = document.querySelector('.date-scroll');
    if (dateScroll) {
        // 自动滚动到选中的日期
        const activeDate = dateScroll.querySelector('.date-item.active');
        if (activeDate) {
            activeDate.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }

        // 日期点击事件
        const dateItems = dateScroll.querySelectorAll('.date-item');
        dateItems.forEach(item => {
            item.addEventListener('click', function() {
                dateItems.forEach(d => d.classList.remove('active'));
                this.classList.add('active');
                
                // 这里可以加载对应日期的日程
                console.log('选中日期');
            });
        });
    }

    // 创建日程按钮
    const createBtns = document.querySelectorAll('.create-schedule-btn, .add-btn');
    createBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('创建日程');
            // 这里可以打开创建日程的页面或弹窗
        });
    });

    // 日程卡片点击
    const scheduleCards = document.querySelectorAll('.schedule-card');
    scheduleCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('查看日程详情');
            // 这里可以跳转到日程详情页
        });
    });

    // 月视图日期单元格点击
    const dayCells = document.querySelectorAll('.day-cell');
    dayCells.forEach(cell => {
        cell.addEventListener('click', function() {
            if (!this.classList.contains('other-month')) {
                dayCells.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                
                // 更新选中日期的日程显示
                console.log('选中日期：', this.textContent.trim());
            }
        });
    });

    // 月份导航
    const monthNavBtns = document.querySelectorAll('.month-nav-btn');
    if (monthNavBtns.length > 0) {
        monthNavBtns[0].addEventListener('click', function() {
            console.log('上一个月');
            // 切换到上一个月
        });

        monthNavBtns[1].addEventListener('click', function() {
            console.log('下一个月');
            // 切换到下一个月
        });
    }

    // 返回按钮样式
    const style = document.createElement('style');
    style.textContent = `
        .back-btn {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            border: none;
            color: white;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
});

// 下拉刷新功能（可选）
let startY = 0;
let isPulling = false;

document.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
});

document.addEventListener('touchmove', function(e) {
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    
    if (diff > 0 && window.scrollY === 0) {
        isPulling = true;
        // 这里可以添加下拉刷新的视觉效果
    }
});

document.addEventListener('touchend', function() {
    if (isPulling) {
        isPulling = false;
        // 这里可以执行刷新操作
        console.log('刷新数据');
    }
});

