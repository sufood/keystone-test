extends ../layouts/base

block intro
        .back-bar
                .container: .row: .col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-2
                        .xs-right: a(href='/blog').text-muted &larr; Back to the blog

block content
        .container: .row: .col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-2
                article.full-post
                        if !post
                                h2 Invalid Post.
                        else
                                header
                                        h1.mb-0= post.title
                                        h4.blog-post__author Posted
                                                if post.publishedDate
                                                        |  on #{moment(post.publishedDate).format('MMMM D, YYYY')}
                                                if post.categories && post.categories.length
                                                        |  in&nbsp;
                                                        each cat, cat_i in post.categories
                                                                a(href='/blog/' + cat.key)= cat.name
                                                                if cat_i < post.categories.length - 1
                                                                        | ,&nbsp;
                                                                else
                                                                        |&nbsp;
                                                if post.author
                                                        |  &middot; by&nbsp;
                                                        a(href='/members', rel='author')=post.author.name.full


                                        //- sharing buttons
                                        .share-buttons
                                                span.share-button
                                                        .fb-like(data-href="http://www.sydjs.com/blog/post/" + post.slug, data-colorscheme="light", data-layout="button_count", data-action="like", data-show-faces="false", data-send="false")
                                                span.share-button
                                                        a(href="https://twitter.com/share", data-via="SydJS", data-hashtags="sydjs", data-count="button", data-dnt="true").twitter-share-button Tweet
                                                span.share-button
                                                        .g-plusone(data-size="medium")
                                .post
                                        if post.image.exists
                                                .thumbnail: img(src=post._.image.fit(750,450)).img-responsive
                                        != post.content.full
                                hr

                                //- Comment
                                .comments
                                        h4=post.comments.length == 0 ? 'Be the first to reply' : plural(post.comments.length, '* comment', '* comments')
                                        .comment.mt-1
                                                for comment in post.comments
                                                        if comment.author
                                                                .media
                                                                        .pull-left
                                                                                img(src=comment.author.photo.exists ? comment.author._.photo.thumbnail(60,60) : '/images/placeholders/user-60x60.jpg', alt=comment.author.name.full, width=40, height=40).media-object.img-circle
                                                                        .media-body
                                                                                h5.mt-0
                                                                                        =comment.author.name.full
                                                                                        span.text-muted  &middot; #{moment(comment.publishedOn).fromNow()}
                                                                                !=comment.content.html
                                if user
                                        //- Reply form
                                        form(method='post').comment-form.mt-5
                                                input(type='hidden', name='action', value='create-comment')
                                                .media
                                                        .pull-left
                                                                img(src=user.photo.exists ? user._.photo.thumbnail(60,60) : '/images/placeholders/user-60x60.jpg', alt=user.name.full, width=40, height=40).img-responsive.img-circle
                                                        .media-body
                                                                textarea(placeholder='Add your comment...', name='content').form-control
                                                                .form-inline.mv-5
                                                                        button(type='submit').btn.btn-success Submit
block js
        script(src='/js/common/share.js')
        script(src="https://apis.google.com/js/plusone.js")
