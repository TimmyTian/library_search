//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        book_name: "",
        is_alot: false,
        books: [],
        book_count: -1,
        loading: false,
        scroll_height: 0
    },
    bindSearchInput: function (e) {
        this.setData({
            book_name: e.detail.value,
            book_count: -1,
            is_alot: false
        })
    },
    searchBooks: function () {
        if (this.data.book_name === "") return;
        wx.setNavigationBarTitle({
                    title: '西工大图书查询 - '+ this.data.book_name
                    });
        var that = this;
        that.setData({loading: true});
        wx.request({
            url: 'http://cornerapp.applinzi.com/api/search',
            method: "POST",
            data: 'book=' + that.data.book_name,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    loading: false,
                    books: res.data.books,
                    is_alot: res.data.is_alot,
                    book_count: res.data.book_count
                    });
            }
        })
    },
    onShow: function () {
        wx.setNavigationBarTitle({
            title: '西工大图书查询 - '+ this.data.book_name
        })
    },
    onLoad: function () {
        var that = this;
        app.getUserInfo(function (userInfo) {
            that.setData({
                userInfo: userInfo
            });
            that.update()
        });
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                  scroll_height: res.windowHeight * 0.71
                }) 
            }
        });
    }
});
