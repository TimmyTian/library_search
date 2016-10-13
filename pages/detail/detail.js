var app = getApp();
Page({
  data: {
      book_author:"",
      code:"",
      books:[],
      book_name:"加载中...",
      mounted:false
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.book_name
    })
  },
  onLoad: function (options) {
    var that = this;
    setTimeout(function () {
        wx.request({
            url: 'http://cornerapp.applinzi.com/api/detail',
            method: "POST",
            data: 'marc_no=' + options.marc_no,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    books: res.data.books,
                    code: res.data.code,
                    book_author: res.data.book_author,
                    book_name: res.data.book_name,
                    mounted: true
                    });
                wx.setNavigationBarTitle({
                  title: that.data.book_name
                });
            }
            });
            }, 1000);
  },
  returnIndex: function(){
    wx.navigateBack()
  }
})