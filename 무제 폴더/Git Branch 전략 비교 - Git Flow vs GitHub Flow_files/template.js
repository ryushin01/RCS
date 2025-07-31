
var COMMENT_REPLY_APPEND_TEMPLATE =
    '<li>' +
        '<div class="comment-top">' +
            '<dl class="author">' +
                '<dt><img src="../../resource/images/external/common/img_author.png" alt=""></dt>' +
                '<dd>' +
                    '<em>{{tidInfo.subs_id}}</em>' +
                    '<span>{{data.regDate}}</span>' +
                    '</dd>' +
                '</dl>' +
            '<a href="#none" class="delete">삭제</a>' +
        '</div>' +
        '<p class="comment-desc">{{data.content}}</p>' +
        '<div class="comment-bottom">' +
            '<div>' +
                '<span class="favorites">0</span>' +
                '<span class="comment">0</span>' +
            '</div>' +
            '<a href="#none" class="btn">답글</a>' +
        '</div>' +
    '</li>';

var COMMENT_REPLY_TEMPLATE =
    '<div class="comment-reply">' +
        '<textarea name="content" placeholder="주제와 무관한 댓글, 악플은 삭제될 수 있습니다."></textarea>' +
        '<div class="comment-btn">' +
            '<a href="#none" class="btn" data-board-id="{{boardId}}" data-board-comment-parent-id="{{boardParentId}}" data-board-type="{{boardType}}">등록</a>' +
        '</div>' +
    '</div>';