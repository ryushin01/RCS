var jQuery = jQuery.noConflict(true); //facebook 댓글이랑 $가 겹침..
var sidebar;

window.addEventListener('load', Init);
window.addEventListener('resize', adjustTop);

function adjustTop() {
    jQuery(".main-slider").css({"margin-top": jQuery("header").outerHeight() + "px"});
}

function getScrollbarWidth() {
    let el = document.createElement('div');
    el.style.cssText = 'overflow:scroll; visibility:hidden; position:absolute; box-sizing:border-box;';
    document.body.appendChild(el);

    const width = el.offsetWidth - el.clientWidth;
    el.remove();

    return `${width}px`;
}

function toggleSearchForm() {
    const doc = document.documentElement
    const searchWrapper = document.querySelector('.top-navigation-search')
    const searchLayer = searchWrapper.querySelector('.top-navigation-search-from')
    const openButton = searchWrapper.querySelector('.search-open')
    const closeButton = searchWrapper.querySelector('.search-close')


    function onClose() {
        searchWrapper.classList.remove('active')
        setTransition(searchLayer, {
            end: (e) => {
                doc.style.setProperty('--scrollbar-width', getScrollbarWidth());
                doc.classList.remove('overflow-hidden')

                console.log(e)
            }
        })
    }

    searchLayer.addEventListener('click', (e) => {
        if (e.target === searchLayer && searchWrapper.classList.contains('active')) {
            onClose()
        }
    })

    openButton.addEventListener('click', () => {
        setTransition(searchLayer, {
            start: () => {
                doc.style.setProperty('--scrollbar-width', (() => {
                    return `${window.innerWidth - doc.clientWidth}px`
                })());
                doc.classList.add('overflow-hidden')
                searchWrapper.classList.add('active')
            }
        })
    })

    closeButton.addEventListener('click', onClose)
}

function setTransition(element, custom = {}) {
    const options = {
        type: 'transition',
        clazz: 'is-transition',
        key: 'transform',
        start: () => {},
        end: () => {},
        ...custom
    }

    function init() {
        options.start()
        element.classList.add(options.clazz)
        element.addEventListener(`${options.type}end`, onTransitionEnd, {once: true})
    }

    function onTransitionEnd(e) {
        element.classList.remove(options.clazz)
        options.end(e)
    }

    init()
}

function setPageStyle() {
    document.documentElement.style.setProperty('--scrollbar-width', getScrollbarWidth());
}

function getPageNumber() {
    // return location.pathname.split('/')[1] === 'page' ? Number(location.pathname.split('/')[2]) : 1
    const paged = (new URLSearchParams(document.location.search)).get('paged')
    return paged === null ? 1 : paged;
}

function Init() {
    setPageStyle()
    toggleSearchForm();

    adjustTop();

    if (true) {
        jQuery('.firstpaint').hide();

        vobj.categoryLoading = true
        vobj.postLoading = true

        if(location.pathname.split('/')[1] === 'page') {
            let searchParams  = new URLSearchParams(document.location.search);
            let newQueryObject = {}

            searchParams.forEach((value, key) => {
                newQueryObject[key] = value
            });

            let newQueryParams = new URLSearchParams(newQueryObject).toString()
            let replaceUrl = location.protocol + '//' + location.host + '?' + newQueryParams
            history.replaceState('', null, replaceUrl)
        }

        getAjax("get_all_post_cats", null, function (e) {
            vobj.categories = e.data;
            vobj.categoryLoading = false
        });

        const paged = getPageNumber()
        const postdata = {
            post_status: 'publish',
            s: getParam(location.href, 's'),
            paged: paged,
        }

        getAjax("get_posts_data", {
            post: postdata,
            meta: 'main',
        }, function (e) {
            vobj.postLoading = false

            var tags = e.data.tags;
            tags = tags.sort(function (a, b) {
                return b.count - a.count;
            }).slice(0, 8);

            e.data.alttags.forEach(function (obj) {
                var id = obj.term_id;
                for (var i = 0; i < tags.length; i++) {
                    if (tags[i].term_id == id) {
                        tags.splice(i, 1);
                        i--;
                    }
                }
            });
            vobj.tags = e.data.alttags.concat(tags);

            var tax = {
                taxonomy: (getParam(location.href, 'pcat')) ? 'cat' : 'ptag',
                slug: getParam(location.href, 'pcat') || getParam(location.href, 'ptag'),
            };

            if (tax.slug) {
                switch (tax.taxonomy) {
                    case "cat":
                        vobj.vcategory = [...decodeURIComponent(tax.slug).split(',')];
                        break;
                    case "ptag":
                        vobj.vtags = [...decodeURIComponent(tax.slug).split(',')];
                        break;
                }
                return;
            }
            vobj.posts = e.data.posts;
            vobj.pagination = e.data.pagenavi;
            // jQuery('.firstpaint').hide();
        });

        // if(jQuery('.pc.meta-col').length > 0) {
        //     sidebar = new StickySidebar('.pc.meta-col', {
        //         topSpacing: jQuery("header").outerHeight()+20,
        //         bottomSpacing:0,
        //         //containerSelector: '.content',
        //         resizeSensor: true,
        //     });
        // }
    }


    jQuery(".search:not(body)").click(function (e) {
        e.preventDefault();
        jQuery("body").toggleClass("is_search");
        if (jQuery("body").hasClass("is_search")) {
            jQuery(".searchbar")[0].focus();
        }
    });
    jQuery(".search_wrap").click(function (e) {
        if (jQuery(e.target).hasClass("search_wrap")) {
            e.preventDefault();
            jQuery("body").removeClass("is_search");
        }

    });
    jQuery(".hambug_btn").click(function () {
        jQuery(this).toggleClass("active");
        jQuery(".hambug_menu").toggleClass("active");
        jQuery("body").toggleClass("scroll-lock");
    });
    jQuery(".hambug_menu").on('click', function (e) {
        if (e.target == this) {
            jQuery(".hambug_menu").removeClass("active");
            jQuery(".hambug_btn").toggleClass("active");
            jQuery("body").toggleClass("scroll-lock");
        }
    });
    jQuery(".hambug_menu .inner .exit").on('click', function (e) {
        jQuery(".hambug_menu").removeClass("active");
        jQuery(".hambug_btn").toggleClass("active");
        jQuery("body").toggleClass("scroll-lock");
    });

    var swiper = new Swiper(".mainSlider", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        loop: true,
    });
}

//Init();

function getPosts() {
    var data = {
        page: 1,
        posts: 5,
        tag: "",
        cat: "",
    };
    jQuery.post(ajaxurl, data).done(function (res) {
        //console.log(res);
    })
}

function getAjax(action = "", dataset = {}, callback = function (e) {}) {
    var data = {
        action: action,
        data: dataset,
    }
    jQuery.post(ajaxurl, data).done(function (res) {
        callback(res);
    });
}

function isBackNavigation(navigateEvent) {
    if (
        navigateEvent.navigationType === "push" ||
        navigateEvent.navigationType === "replace"
    ) {
        return false;
    }

    if (
        navigateEvent.destination.index !== -1 &&
        navigateEvent.destination.index < navigation.currentEntry.index
    ) {
        return true;
    }

    return false;
}


function isForwardNavigation(navigateEvent) {
    if (
        navigateEvent.navigationType === "push" ||
        navigateEvent.navigationType === "replace"
    ) {
        return false;
    }

    if (
        navigateEvent.destination.index !== -1 &&
        navigateEvent.destination.index > navigation.currentEntry.index
    ) {
        return true;
    }

    return false;
}


if (jQuery('.vuejs').length > 0) {
    var selector = '.vuejs';

    if (jQuery('.single').length > 0) selector = '.hambug_menu';

    let pCategoryList = (new URLSearchParams(document.location.search)).get('pcat');
    pCategoryList = pCategoryList ? decodeURIComponent(pCategoryList).split(',') : []

    let pTagList = (new URLSearchParams(document.location.search)).get('ptag');
    pTagList = pTagList ? decodeURIComponent(pTagList).split(',') : []

    var vobj = new Vue({
        el: selector,
        data: {
            loading: true,
            site: {
                url: location.origin + '/wp-content/themes/Vanila/imgs',
            },
            page: {
                previous: {
                    url: '',
                    title: '',
                },
                next: {
                    url: '',
                    title: '',
                }
            },
            categories: [],
            vcategory: pCategoryList,
            tags: [],
            vtags: pTagList,
            posts: {},
            pages: [],
            page: 1,
            perpage: 5,
            pagination: "",
            categoryLoading: false,
            tagLoading: false,
            postLoading: false,
            isBack: false,
            isForward: false
        },
        created: function () {
            //document.querySelector('.item.loading').style.display = "none";
        },
        watch: {
            "vcategory": function (newValue, oldValue) {
                var cat = this.vcategory;

                const isChangeCategory = JSON.stringify(newValue) === JSON.stringify(oldValue)

                vobj.page = isChangeCategory ? getPageNumber() : 1;

                if (this.vtags.length > 0) {
                    if(!vobj.isBack && !vobj.isForward) {
                        this.vtags = [];
                    }
                } else {
                    var post_query = {
                        post: {
                            post_type: "post",
                            paged: vobj.page,
                        }
                    };

                    if (cat.length > 0) {
                        post_query['post']['tax_query'] = [{
                            taxonomy: 'category',
                            field: 'slug',
                            terms: cat,
                            operator: 'and',
                        }];
                    } else {
                        if (jQuery('body').hasClass('home')) post_query.meta = 'main';
                    }

                    vobj.setURLParams(!isChangeCategory)

                    vobj.postLoading = true
                    getAjax("get_posts_data", post_query, function (res) {
                        vobj.postLoading = false
                        var data = res.data;
                        var tags = data.tags;

                        vobj.posts = data.posts;

                        tags = tags.sort(function (a, b) {
                            if (a.count > b.count) {
                                return -1;
                            }
                            if (a.count < b.count) {
                                return 1;
                            }
                            return 0;
                        }).slice(0, 8);

                        res.data.alttags.forEach(function (obj) {
                            var id = obj.term_id;
                            for (var i = 0; i < tags.length; i++) {
                                if (tags[i].term_id == id) {
                                    tags.splice(i, 1);
                                    i--;
                                }
                            }
                        });

                        vobj.tags = res.data.alttags.concat(tags);
                        vobj.pagination = data.pagenavi;

                        //setPagination(data.pagination);
                    });
                }

            },
            "vtags": function (newValue, oldValue) {
                var cat = vobj.vcategory.map(v => decodeURIComponent(v));
                var tag = vobj.vtags.map(v => decodeURIComponent(v));

                const isChangeTag = JSON.stringify(newValue) === JSON.stringify(oldValue)

                vobj.page = isChangeTag ? getPageNumber() : 1;

                var post_query = {
                    post: {
                        post_type: "post",
                        paged: vobj.page,
                        tax_query: []
                    }
                };

                if (tag.length > 0) {
                    post_query['post']['tax_query'].push({
                        taxonomy: 'post_tag',
                        field: 'slug',
                        terms: tag,
                        operator: 'and',
                    });
                }

                if (cat.length > 0) {
                    post_query['post']['tax_query'].push({
                        taxonomy: 'category',
                        field: 'slug',
                        terms: cat,
                        operator: 'and',
                    });
                }

                vobj.setURLParams(!isChangeTag)

                vobj.postLoading = true
                getAjax("get_posts_data", post_query, function (res) {
                    vobj.postLoading = false
                    //console.log(res.data);
                    var data = res.data;
                    vobj.posts = data.posts;
                    vobj.pagination = data.pagenavi;

                    //setPagination(data.pagination);
                });
            },
            "page": function () {
                jQuery([document.documentElement, document.body]).animate({
                    // scrollTop: jQuery(".col.col-main").offset().top - 150
                    scrollTop: jQuery(".page-main").offset().top - 150
                }, 500);
            },
        },
        updated: function () {
            // TODO: pagination 클릭 정의 확인필요
            jQuery('body:not(.search, .category, .author) .wp-pagenavi a').off('click').on('click', function (e) {
                e.preventDefault();
                var param = 1;
                //console.log(jQuery(this).attr('href').split("?").length);
                if (jQuery(this).attr('href').split("?").length > 1) {
                    param = getParam(jQuery(this).attr('href'), 'paged');
                }
                settingPage(param);
            });
            if (sidebar) {
                sidebar.updateSticky();
            }
        },
        mounted: function () {
            this.init()
        },
        methods: {
            init: function() {
                navigation.addEventListener('navigate', (event) => {
                    vobj.isBack = isBackNavigation(event);
                    vobj.isForward = isForwardNavigation(event);


                    if (vobj.isBack || vobj.isForward) {
                        event.intercept({
                            async handler() {
                                await (() => {
                                    const params = new URLSearchParams(document.location.search)
                                    vobj.vcategory = params.get('pcat') === null ? [] : [...decodeURIComponent(params.get('pcat')).split(',')];
                                    vobj.vtags = params.get('ptag') === null ? [] : [...decodeURIComponent(params.get('ptag')).split(',')];
                                })()

                                vobj.isForward = false
                                vobj.isBack = false
                            }
                        })
                    }
                })
            },
            setPage: function (a) {
                settingPage(a);
            },
            setURLParams: function(changePage) {
                const pcat = vobj.vcategory.map(v => decodeURIComponent(v));
                const ptag = vobj.vtags.map(v => decodeURIComponent(v));

                let searchParams  = new URLSearchParams(document.location.search);
                let newQueryObject = {}

                searchParams.forEach((value, key) => {
                    newQueryObject[key] = value
                });

                newQueryObject.paged = changePage ? 1 : getPageNumber()

                newQueryObject = {
                    ...newQueryObject,
                    // paged: vobj.page,
                    ptag,
                    pcat
                }

                if(ptag.length <= 0) {
                    delete newQueryObject.ptag
                }

                if(pcat.length <= 0) {
                    delete newQueryObject.pcat
                }

                let newQueryParams = new URLSearchParams(newQueryObject).toString()
                const replaceUrl = location.protocol + '//' + location.host + '?' + newQueryParams

                if(changePage) {
                    history.pushState('', null, replaceUrl);
                }
            }
        }
    });
}

function setPagination(pgobj) {
    var pagearr = [];
    for (var i = 0; i < pgobj.max; i++) {
        pagearr.push(i + 1);
    }
    var pgp = Math.floor((pgobj.current - 1) / 5) + 1;
    vobj.pages = paginate(pagearr, 5, pgp);
}

function convertDate(a) {
    var month = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var out = a;
    for (var i = 1; i < 13; i++) {
        out = out.replace(i + "월", month[i]);
    }
    return out;
}

function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function settingPage(a) {
    vobj.page = a// || (new URLSearchParams(document.location.search)).get('paged');
    var cat = vobj.vcategory;
    var tag = vobj.vtags;
    var post_query = {
        post: {
            post_type: "post",
            paged: vobj.page,
            tax_query: []
        }
    };
    if (jQuery('body').hasClass('home')) {
        post_query.meta = 'main';
    }
    if (tag.length > 0) {
        post_query['post']['tax_query'].push({
            taxonomy: 'post_tag',
            field: 'slug',
            terms: tag,
        });
    }
    if (cat.length > 0) {
        post_query['post']['tax_query'].push({
            taxonomy: 'category',
            field: 'slug',
            terms: cat,
        });
    }

    vobj.postLoading = true

    let searchParams  = new URLSearchParams(document.location.search);
    let newQueryObject = {}

    searchParams.forEach((value, key) => {
        newQueryObject[key] = value
    });

    newQueryObject.paged = vobj.page

    let newQueryParams = new URLSearchParams(newQueryObject).toString()
    let replaceUrl = location.protocol + '//' + location.host + '?' + newQueryParams

    history.pushState('', null, replaceUrl)

    getAjax("get_posts_data", post_query, function (res) {
        var data = res.data;
        vobj.posts = data.posts;
        vobj.pagination = data.pagenavi;
        //setPagination(data.pagination);
        vobj.postLoading = false
    });
}

function getParam(url, sname) {
    if (url.split("?").length == 1) return "";
    var params = url.split("?")[1].substr(0);

    var sval = "";

    params = params.split("&");

    for (var i = 0; i < params.length; i++) {

        temp = params[i].split("=");

        if ([temp[0]] == sname) {
            sval = temp[1];
        }

    }

    return sval;

}

function copyClipboard(str) {
    var tempElem = document.createElement('textarea');
    tempElem.value = str;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand("copy");
    document.body.removeChild(tempElem);
    window.alert("복사되었습니다.");
}

function SNS(a) {
    event.preventDefault();
    switch (a) {
        case "clipboard":
            copyClipboard(location.href);
            break;
        case "kakao":

            break;
        case "facebook":
            // Facebook 공유
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href));
            break;
        case "twitter":
            // Twitter 공유
            window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(location.href));
            break;
    }
}