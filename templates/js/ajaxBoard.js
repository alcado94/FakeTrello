var BoardDAO = (function() {
	var resourcePath = "/board/";
	var requestByAjax = function(data, done, fail, always) {
		done = typeof done !== 'undefined' ? done : function() {};
		fail = typeof fail !== 'undefined' ? fail : function() {};
		always = typeof always !== 'undefined' ? always : function() {};

		$.ajax(data)
			.done(done)
			.fail(fail)
			.always(always);
	};

	function BoardDAO() {
		this.boards = function(done, fail, always) {
			requestByAjax({
				url: resourcePath,
				type: 'GET'
			}, done, fail, always);
		};

		this.addBoard = function(board, done, fail, always) {
			requestByAjax({
				url: resourcePath,
				type: 'POST',
				data: board,
				dataType: 'json',
				success: function(response){
				    board.id=response.key;
				    board.table=response.title;
				},
				error: function(error){
					 console.log("Error:");
					 console.log(error);
				}
			}, done, fail, always);
		};

		this.modifyBoard = function(board, done, fail, always) {
			requestByAjax({
				url: resourcePath,
				type: 'POST',
				data: board
			}, done, fail, always);
		};

		this.deleteBoard = function(board, done, fail, always) {
			requestByAjax({
				url: resourcePath,
				type: 'POST',
				data: board
			}, done, fail, always);
		};
	}

	return BoardDAO;
})();