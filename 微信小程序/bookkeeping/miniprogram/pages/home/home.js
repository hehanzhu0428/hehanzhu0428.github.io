// miniprogram/pages/home/home.js
import {
    formats
} from '../../js/formats'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dateRange: {
            start: '',
            end: ''
        },
        nowDate: '',
        bookingDateData: [],
        MoneyDataByDate: {
            shouru: 0,
            zhichu: 0
        },
        MoneyDataByMonth: {
            shouru: 0,
            zhichu: 0
        },
        monthBalance: {
            intBalance: 0,
            decBalance: 0
        },
        loading:true
    },
    onShow() {
        this.getNowDate()
        this.getDataByDate(this.data.dateRange.end)
        this.getDataByMonth()
    },
    //获取目前的日期
    getNowDate() {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        month = month >= 10 ? month : '0' + month
        day = day >= 10 ? day : '0' + day
        this.setData({
            dateRange: {
                start: `${year}-${month}-01`,
                end: `${year}-${month}-${day}`
            },
            nowDate: `${month}月${day}日`
        })
    },
    //选择日期
    selectDate(e) {
        //
        let date = e.detail.value.split('-')
        let nowDate = `${date[1]}月${date[2]}日`
        if (nowDate == this.data.nowDate) {
            return
        }
        this.setData({
            nowDate: nowDate
        })
        this.getDataByDate(e.detail.value)
    },
    //根据日期查询数据
    getDataByDate(date) {
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.cloud.callFunction({
            name: "getdatabyDate", //云函数名称
            data: { //参数
                date
            }
        }).then(result => {
            wx.hideLoading()
            //
            this.setData({
                MoneyDataByDate: {
                    shouru: 0,
                    zhichu: 0
                }
            })
            result.result.data.map(v => {
                this.data.MoneyDataByDate[v.bookingTypeData.type] += Number(v.money)
                v.money = formats.thousandthPercentile(Number(v.money).toFixed(2))
            })
            for (let key in this.data.MoneyDataByDate) {
                this.data.MoneyDataByDate[key] = formats.thousandthPercentile(this.data.MoneyDataByDate[key].toFixed(2))
            }
            //响应页面数据
            this.setData({
                bookingDateData: result.result.data,
                MoneyDataByDate: this.data.MoneyDataByDate
            })
            
        }).catch(err => {
            wx.hideLoading()
            
        })
    },
    //查询一整月的数据
    getDataByMonth() {
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.cloud.callFunction({
            name: "getdatabyMonth", //云函数名称
            data: this.data.dateRange //参数

        }).then(result => {
            wx.hideLoading()
            //
            this.setData({
                MoneyDataByMonth: {
                    shouru: 0,
                    zhichu: 0
                }
            })
            result.result.data.map(v => {
                this.data.MoneyDataByMonth[v.bookingTypeData.type] += Number(v.money)
            })
            let monthBalance = (this.data.MoneyDataByMonth.shouru - this.data.MoneyDataByMonth.zhichu).toFixed(2).split('.')
            //
            this.data.monthBalance.intBalance = formats.thousandthPercentile(Math.abs(monthBalance[0]))
            this.data.monthBalance.decBalance = monthBalance[1]
            for (let key in this.data.MoneyDataByMonth) {
                this.data.MoneyDataByMonth[key] = formats.thousandthPercentile(this.data.MoneyDataByMonth[key].toFixed(2))
            }

            //响应页面数据
            this.setData({
                MoneyDataByMonth: this.data.MoneyDataByMonth,
                monthBalance: this.data.monthBalance,
                loading:false
            })

        }).catch(err => {
            wx.hideLoading()
            
        })
    },
    translatePlayCount(n) {
        if (n > 99999999) {
            n / 10000;
            return Number(n / 100000000).toFixed(2) + "亿";
        }
        if (n > 9999) {
            n / 10000;
            return Number(n / 10000).toFixed(1) + "万";
        }
    },



})