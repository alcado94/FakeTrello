var TaskDAO = (function() {
	var resourcePath = "/task/";
	var requestByAjax = function(data, done, fail, always) {
		done = typeof done !== 'undefined' ? done : function() {};
		fail = typeof fail !== 'undefined' ? fail : function() {};
		always = typeof always !== 'undefined' ? always : function() {};

		$.ajax(data)
			.done(done)
			.fail(fail)
			.always(always);
	};

	function TaskDAO() {
		this.tasks = function(done, fail, always) {
			requestByAjax({
				url: resourcePath,
				type: 'GET'
			}, done, fail, always);
		};

		this.addTask = function(task, done, fail, always) {
			requestByAjax({
				url: resourcePath,
				type: 'POST',
				data: task,
				dataType: 'json',
				success: function(response){
				    task.id=response.key;
				},
				error: function(error){
					 console.log("Error:");
					 console.log(error);
				}
			}, done, fail, always);
		};

		this.modifyTask = function(task, done, fail, always) {
			requestByAjax({
				url: resourcePath,
				type: 'POST',
				data: task
			}, done, fail, always);
		};

		this.deleteTask = function(task, done, fail, always) {
			requestByAjax({
				url: resourcePath,
				type: 'POST',
				data: task
			}, done, fail, always);
		};
	}

	return TaskDAO;
})();