
// 게시판 댓글 타입
var BOARD_COMMENT_TYPE = {
    BLOG: 'BLOG', // B.Log 전용
    VLOG: 'VLOG', // V.Log 전용
    OPENSOURCE: 'OPENSOURCE', // OpenSource 전용
    EVENT: 'EVENT', // Event 전용
    EXPERTS_QNA: 'EXPERTS_QNA', // Experts Q/A 전용
    EXPERTS_MENTO: 'EXPERTS_MENTO', // Experts 멘토링 전용
}

// 좋아요 타입
var BOARD_LIKE_TYPE = {
    BLOG: 'BLOG', // B.Log 전용
    VLOG: 'VLOG', // V.Log 전용
    OPENSOURCE: 'OPENSOURCE', // OpenSource 전용
    EVENT: 'EVENT', // Event 전용
    COMMENT: 'COMMENT', // 커멘트 타입
    EXPERTS_QNA: 'EXPERTS_QNA', // Experts Q/A 전용
    EXPERTS_MENTO: 'EXPERTS_MENTO', // Experts 멘토링 전용
}

// 이벤트 상단 탭
var EVENT_MAIN_TAB_TYPE = {
    EVENT_OPEN: 'Y', // 진행중인 이벤트
    EVENT_CLOSE: 'N' // 종료된 이벤트
}

// 이벤트 하단 탭
var EVENT_SUB_TAB_TYPE = {
    EVENT_ALL: 'ALL', // 전체 이벤트
    EVENT_ONLINE: 'E01', // 온라인 행사 참여
    EVENT_OFFLINE: 'E02', // 오프라인 행사 참여
    EVENT_QUIZ: 'E03', // 퀴즈
}