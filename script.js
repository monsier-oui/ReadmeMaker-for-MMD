//ロード時
$(document).ready(function(){
	// 保存済み設定を取得して表示
	// if(localStorage.options){
	// 	var options = JSON.parse(localStorage.options);
	// 	showOptions(options);
	// }

	// チェックを反映
	$('#save').click(function(){
		$('#output-ok, #output-ng').html('');
		for(var i=0; i<$('#input').find('input').length; i++){
			if($('#input').find('input:eq('+i+')').is(':checked')){
				$('#output-ok').append('<li>'+$('#input').find('input:eq('+i+')').parent('label').text()+'</li>');
				console.log(i+'番目のチェックが選択されています');
			} else {
				$('#output-ng').append('<li>'+$('#input').find('input:eq('+i+')').parent('label').text()+'</li>');
				console.log(i+'番目のチェックが選択されていません');
			}
		}
	});
});