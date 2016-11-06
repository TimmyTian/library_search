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
        scroll_height: 0,
        button_bcolor: "#b2b2b2"
    },
    bindSearchInput: function (e) {
        this.setData({
            book_name: e.detail.value,
            book_count: -1,
            is_alot: false
        });
        if(this.data.book_name.replace(/\s+/g, "") == ""){
            this.setData({
                button_bcolor:"#b2b2b2"
            });
        }else{
            this.setData({
                button_bcolor:"#04BE02"
            });
        }
    },
    autoSearch: function () {
        if (this.data.book_name === "") return;
        var that = this;
        that.setData({loading: true});
        wx.request({
            url: 'https://cornerapp.applinzi.com/api/search',
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
    searchBooks: function () {
        if (this.data.book_name === "") return;
        var that = this;
        that.setData({loading: true});
        wx.request({
            url: 'https://cornerapp.applinzi.com/api/search',
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
