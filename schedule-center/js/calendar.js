// 日历相关功能
class Calendar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentDate = new Date();
        this.selectedDate = new Date();
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    // 生成日历
    generateCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);
        
        const firstDayWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
        const daysInMonth = lastDay.getDate();
        const prevDaysInMonth = prevLastDay.getDate();
        
        const dates = [];
        
        // 上月日期
        for (let i = firstDayWeek - 1; i > 0; i--) {
            dates.push({
                day: prevDaysInMonth - i + 1,
                type: 'prev',
                date: new Date(year, month - 1, prevDaysInMonth - i + 1)
            });
        }
        
        // 当月日期
        for (let i = 1; i <= daysInMonth; i++) {
            dates.push({
                day: i,
                type: 'current',
                date: new Date(year, month, i)
            });
        }
        
        // 下月日期
        const remainingDays = 42 - dates.length;
        for (let i = 1; i <= remainingDays; i++) {
            dates.push({
                day: i,
                type: 'next',
                date: new Date(year, month + 1, i)
            });
        }
        
        return dates;
    }

    // 渲染日历
    render() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const dates = this.generateCalendar(year, month);
        
        // 更新月份显示
        document.querySelector('.year').textContent = `${year}年`;
        document.querySelector('.month').textContent = `${month + 1}月`;
        
        // 生成日期网格
        const datesGrid = document.querySelector('.dates-grid');
        datesGrid.innerHTML = '';
        
        dates.forEach(dateInfo => {
            const dateEl = document.createElement('div');
            dateEl.className = 'date';
            
            if (dateInfo.type === 'prev' || dateInfo.type === 'next') {
                dateEl.classList.add('prev-month-date');
            }
            
            // 判断是否为今天
            const today = new Date();
            if (this.isSameDay(dateInfo.date, today)) {
                const todayTag = document.createElement('span');
                todayTag.className = 'date-tag today';
                todayTag.textContent = '今';
                dateEl.appendChild(todayTag);
            }
            
            // 判断是否为选中日期
            if (this.isSameDay(dateInfo.date, this.selectedDate)) {
                dateEl.classList.add('selected');
            }
            
            // 判断是否为周末
            const dayOfWeek = dateInfo.date.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                dateEl.classList.add('weekend');
                const holidayTag = document.createElement('span');
                holidayTag.className = 'holiday-tag';
                holidayTag.textContent = '休';
                dateEl.appendChild(holidayTag);
            }
            
            // 添加日期数字
            const dayNumber = document.createElement('span');
            dayNumber.className = 'day-number';
            dayNumber.textContent = dateInfo.day;
            dateEl.appendChild(dayNumber);
            
            // 添加日程标记点
            if (this.hasSchedule(dateInfo.date)) {
                const dot = document.createElement('span');
                dot.className = 'dot';
                
                // 判断是过期还是未开始
                if (dateInfo.date < today) {
                    dot.classList.add('gray-dot');
                } else {
                    dot.classList.add('red-dot');
                }
                
                dateEl.appendChild(dot);
            }
            
            // 添加点击事件
            dateEl.addEventListener('click', () => {
                this.selectDate(dateInfo.date);
            });
            
            // 添加右键菜单
            dateEl.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showCreateScheduleMenu(e, dateInfo.date);
            });
            
            datesGrid.appendChild(dateEl);
        });
    }

    // 判断是否为同一天
    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    // 判断日期是否有日程
    hasSchedule(date) {
        // 示例：固定几个日期有日程
        const day = date.getDate();
        return [1, 19, 20, 21].includes(day);
    }

    // 选择日期
    selectDate(date) {
        this.selectedDate = date;
        this.render();
        this.updateScheduleList(date);
    }

    // 更新日程列表
    updateScheduleList(date) {
        const scheduleList = document.querySelector('.schedule-list h3');
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        scheduleList.textContent = `${year}年${month}月${day}日 日程`;
        
        // 这里可以根据实际情况更新日程列表内容
        // 目前使用静态数据
    }

    // 上个月
    prevMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
    }

    // 下个月
    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
    }

    // 显示创建日程菜单
    showCreateScheduleMenu(event, date) {
        // 创建右键菜单
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.position = 'fixed';
        menu.style.left = event.clientX + 'px';
        menu.style.top = event.clientY + 'px';
        menu.innerHTML = `
            <div class="context-menu-item">
                <span>创建日程</span>
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // 点击菜单项
        menu.querySelector('.context-menu-item').addEventListener('click', () => {
            this.createSchedule(date);
            document.body.removeChild(menu);
        });
        
        // 点击其他地方关闭菜单
        setTimeout(() => {
            document.addEventListener('click', function closeMenu() {
                if (menu.parentNode) {
                    document.body.removeChild(menu);
                }
                document.removeEventListener('click', closeMenu);
            });
        }, 0);
    }

    // 创建日程
    createSchedule(date) {
        console.log('创建日程：', date);
        // 这里可以打开创建日程的模态框
        const modal = document.getElementById('createScheduleModal');
        if (modal) {
            modal.classList.add('show');
        }
    }

    // 绑定事件
    bindEvents() {
        // 上一月按钮
        document.querySelector('.prev-month').addEventListener('click', () => {
            this.prevMonth();
        });
        
        // 下一月按钮
        document.querySelector('.next-month').addEventListener('click', () => {
            this.nextMonth();
        });
        
        // 创建日程按钮
        document.querySelector('.add-schedule-btn').addEventListener('click', () => {
            this.createSchedule(this.selectedDate);
        });
        
        // 日程项悬停效果
        const scheduleItems = document.querySelectorAll('.schedule-item');
        scheduleItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(4px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(4px)';
            });
        });
    }
}

// 导出
window.Calendar = Calendar;

