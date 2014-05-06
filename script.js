//ロード時
$(document).ready(function(){
	// チェックを反映
	$('#save').click(function() {
		// 取得したテキストを格納する配列を初期化
		var text = new Array();
		// アウトプット欄を初期化
		$('#output').find('p').text('');
		// チェックボックスを取得してアウトプット
		var checkboxes = $('#input').find('.indent-first');
		for(var i=0; i<checkboxes.length; i++) {
			var check = checkboxes.eq(i);
			text[0] = check.siblings('span:lang(ja)').text();
			text[1] = check.siblings('span:lang(en)').text();
			if(check.is('.term-parent')) {
				if(check.is(':checked')){
					listup(true, text);
				} else {
					var checkboxes_children = check.closest('.input-parent').find('.indent-second');
					var sum = 0;
					for(var j=0; j<checkboxes_children.length; j++){
						if(checkboxes_children.eq(j).is(':checked')){
							sum++;
						} 
					}
					if(sum == 0){
						listup(false, text);
					} else {
						for(var n=0; n<checkboxes_children.length; n++){
							text[0] = checkboxes_children.eq(n).siblings('span:lang(ja)').text();
							text[1] = checkboxes_children.eq(n).siblings('span:lang(en)').text();
							listup(checkboxes_children.eq(n).is(':checked'), text);
						}
					}
				}
			} else {
				listup(check.is(':checked'), text);
			}
		}
	});
	function listup(c, text){
		if(c){
			$('#ja-pt-ok').append('・'+text[0]+'<br>');
			$('#ja-md-ok').append('* '+text[0]+'<br>');
			$('#en-pt-ok').append('・'+text[1]+'<br>');
			$('#en-md-ok').append('* '+text[1]+'<br>');
		} else {
			$('#ja-pt-ng').append('・'+text[0]+'<br>');
			$('#ja-md-ng').append('* '+text[0]+'<br>');
			$('#en-pt-ng').append('・'+text[1]+'<br>');
			$('#en-md-ng').append('* '+text[1]+'<br>');
		}
	}

	//親チェックボックスを子チェックボックスすべてに反映
	$('.term-parent').click(function(){
		var children = $(this).closest('li').find('.term');
		if($(this).is(':checked') == true) {
			children.prop({'checked': true});
		} else {
			children.prop({'checked': false});
		}
	});
	//子チェックボックスのチェックが外れたら親チェックボックスも外す
	$('.input-children').find('.term').click(function(){
		if($(this).is(':checked') == false) {
			$(this).closest('.input-parent').find('.term-parent').prop({'checked': false});
		}
	});
	//すべてクリア
	$('#clear').click(function(){
		$('#input').find('input[type="checkbox"]').prop({'checked': false});
		$('#output').find('p').text('');
	});

	// タブを表示
	$('#output').each(function(index) {
		$(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
	});
	$('#output').on('click', 'li > a', function(event) {
		if (!$(this).hasClass('is-active')) {
			event.preventDefault();
			var accordionTabs = $(this).closest('#output')
			accordionTabs.find('.is-open').removeClass('is-open').hide();
			$(this).next().toggleClass('is-open').toggle();
			accordionTabs.find('.is-active').removeClass('is-active');
			$(this).addClass('is-active');
		} else {
			event.preventDefault();
		}
	});

	//ツイートボタン
	var url = location.href;
	$('#tweet').click(function(){
		window.open('http://twitter.com/share?text=ReadmeMaker+for+MMD&url='+url, 'tweetwindow', 'width=550, height=420');
	});
	//ツイート数
	//JSONの読み込み
	$.ajax({
		type: 'GET',
		url: 'http://urls.api.twitter.com/1/urls/count.json',
		data: {
			url : encodeURI(url),
			noncache: new Date()
		},
		dataType: 'jsonp',
		success: function(data) {
			//読み込み結果
			$('#tweet-count').find('a').text(data.count).attr({'href': 'https://twitter.com/search?q='+url+'&src=typd'});
		}
	});

});