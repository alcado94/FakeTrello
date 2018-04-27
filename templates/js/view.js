var TaskView = (function() {
	var dao;

	// Referencia a this que permite acceder a las funciones públicas desde las funciones de jQuery.
	var self;


	function TaskView(taskDao) {
		dao = taskDao;
		self = this;
		task = "";

		this.init = function() {


			tasks = dao.tasks;
			// La acción por defecto de enviar formulario (submit) se sobreescribe
			// para que el envío sea a través de AJAX

			$('#addFormTask').submit(function(event) {
				self.task = self.postTask();


                dao.addTask(self.task,
                    function(task) {
                		self.newTask(self.task);

						$('#modal1.modal').modal(
							'hide'
						);
						self.resetForm();
                    },
                    showErrorMessage
                );
				console.log(self.task);

				return false;
			});

			$('#delFormTask').submit(function(event) {
				self.task = self.delTask();

                dao.deleteTask(self.task,
                    function(task) {
                		self.deleteTask(self.task);

						$('#modal2.modal').modal(
							'hide'
						);
                    },
                    showErrorMessage
                );


				return false;
			});

			$('#modFormTask').submit(function(event) {
                self.task = self.putTask();

                dao.modifyTask(self.task,
                    function (task) {
                        self.reloadTask(self.task);

                        $('#modal5.modal').modal(
                            'hide'
                        );
                        self.resetForm();
                    },
                    showErrorMessage
                );


                return false;
            });
		};

		this.postTask = function() {
			var form = $('#addFormTask');

			return {
				'method' : form.find('input[name="method"]').val(),
				'title': form.find('input[name="title"]').val(),
				'description': form.find('textarea[name="description"]').val()
			};
		};

		this.putTask = function() {
			var form = $('#modFormTask');

			return {
				'id' : form.find('input[name="key"]').val(),
				'method' : form.find('input[name="method"]').val(),
				'title': form.find('input[name="title"]').val(),
				'description': form.find('textarea[name="description"]').val(),
				'status': 'ToDo'
			};
		};

		this.delTask = function() {
			var form = $('#delFormTask');

			return {
				'method' : form.find('input[name="method"]').val(),
				'id' : $('#delid').attr('value')
			};
		};

		this.isEditing = function() {
			return $('#addFormTask' + ' input[name="id"]').val() != "";
		};

		this.enableForm = function() {

		};

		this.resetForm = function() {
			$('#addFormTask').find('input[name="title"]').val('');
			$('#addFormTask').find('textarea[name="description"]').val('');
		};

		this.deleteTask = function(id) {
			$('#'+id.id).remove();
		};

		this.reloadTask = function (task){
			card = $('#'+task.id);

			card.find('#title-task').text(task.title);
			card.find('#description-task').text(task.description);
		};

		this.newTask = function (task) {
			$('#listToDo').prepend(
				"<div class=\"ui card\" id=\"" + task.id + "\">\n" +
                "    <div class=\"content auto-center-row\" style=\"justify-content: space-between\">\n" +
                "        <div class=\"header\" id=\"title-task\"> "+task.title+" </div>\n" +
                "        <div class=\"ui compact menu\" style=\"border: none; box-shadow: none;\">\n" +
                "            <div class=\"ui simple dropdown item\">\n" +
                "                <i class=\"dropdown icon\"></i>\n" +
                "                <div class=\"menu\">\n" +
                "                    <button class=\"ui button\" data-modal=\"modal5\" data-key=\"" + task.id + "\" id=\"new3\">\n" +
                "                        <i class=\"icon settings\"></i>\n" +
                "                    </button>\n" +
                "                    <button class=\"ui button\" data-modal=\"modal2\" data-key=\"" + task.id + "\">\n" +
                "                        <i class=\"trash alternate outline icon\"></i>\n" +
                "                    </button>\n" +
                "                    \n" +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "\n" +
                "    <div class=\"content\">\n" +
                "    \n" +
                "        <div class=\"ui small feed\">\n" +
                "             <div class=\"event\">\n" +
                "                 <div class=\"content\">\n" +
                "                      <div class=\"summary\" id=\"description-task\">\n" +
                "                                    "+task.description +
                "                      </div>\n" +
                "                 </div>\n" +
                "             </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "    <div class=\"extra content auto-center-row\" style=\"justify-content: space-between\">\n" +
                "        <div>\n" +
                "             <button class=\"ui disabled icon button\" >\n" +
                "                 <i class=\"arrow alternate circle left icon\"></i>\n" +
                "             </button>\n" +
                "             <button class=\"ui icon button\" data-status=\"toDoing\" data-key=\"" + task.id + "\">\n" +
                "                 <i class=\"arrow alternate circle right icon\"></i>\n" +
                "             </button>\n" +
                "        </div>\n" +
                "   <div> \n" +
                "</div>\n" +
                "</div>\n" +
                "\n" +
                "</div>"
			);
        }

        this.doingTask = function (task) {

			$('#listDoing').prepend(
				"<div class=\"ui card\" id=\"" + task.id + "\">\n" +
                "    <div class=\"content auto-center-row\" style=\"justify-content: space-between\">\n" +
                "        <div class=\"header\" id=\"title-task\"> "+task.title+" </div>\n" +
                "        <div class=\"ui compact menu\" style=\"border: none; box-shadow: none;\">\n" +
                "            <div class=\"ui simple dropdown item\">\n" +
                "                <i class=\"dropdown icon\"></i>\n" +
                "                <div class=\"menu\">\n" +
                "                    <button class=\"ui button\" data-modal=\"modal5\" data-key=\"" + task.id + "\" id=\"new3\" >\n" +
                "                        <i class=\"icon settings\"></i>\n" +
                "                    </button>\n" +
                "                    <button class=\"ui button\" data-modal=\"modal2\" data-key=\"" + task.id + "\">\n" +
                "                        <i class=\"trash alternate outline icon\"></i>\n" +
                "                    </button>\n" +
                "                    \n" +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "\n" +
                "    <div class=\"content\">\n" +
                "    \n" +
                "        <div class=\"ui small feed\">\n" +
                "             <div class=\"event\">\n" +
                "                 <div class=\"content\">\n" +
                "                      <div class=\"summary\" id=\"description-task\">\n" +
                "                                    "+task.description +
                "                      </div>\n" +
                "                 </div>\n" +
                "             </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "    <div class=\"extra content auto-center-row\" style=\"justify-content: space-between\">\n" +
                "        <div>\n" +
                "             <button class=\"ui icon button\" data-status=\"toToDo\" data-key=\"" + task.id + "\">\n" +
                "                 <i class=\"arrow alternate circle left icon\"></i>\n" +
                "             </button>\n" +
                "             <button class=\"ui icon button\" data-status=\"toDone\" data-key=\"" + task.id + "\">\n" +
                "                 <i class=\"arrow alternate circle right icon\"></i>\n" +
                "             </button>\n" +
                "        </div>\n" +
                "   <div> \n" +
                "</div>\n" +
                "</div>\n" +
                "\n" +
                "</div>"
			);
        }

        this.doneTask = function (task) {

			$('#listDone').prepend(
				"<div class=\"ui card\" id=\"" + task.id + "\">\n" +
                "    <div class=\"content auto-center-row\" style=\"justify-content: space-between\">\n" +
                "        <div class=\"header\" id=\"title-task\"> "+task.title+" </div>\n" +
                "        <div class=\"ui compact menu\" style=\"border: none; box-shadow: none;\">\n" +
                "            <div class=\"ui simple dropdown item\">\n" +
                "                <i class=\"dropdown icon\"></i>\n" +
                "                <div class=\"menu\">\n" +
                "                    <button class=\"ui button\" data-modal=\"modal5\" data-key=\"" + task.id + "\" id=\"new3\">\n" +
                "                        <i class=\"icon settings\"></i>\n" +
                "                    </button>\n" +
                "                    <button class=\"ui button\" data-modal=\"modal2\" data-key=\"" + task.id + "\">\n" +
                "                        <i class=\"trash alternate outline icon\"></i>\n" +
                "                    </button>\n" +
                "                    \n" +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "\n" +
                "    <div class=\"content\">\n" +
                "    \n" +
                "        <div class=\"ui small feed\">\n" +
                "             <div class=\"event\">\n" +
                "                 <div class=\"content\">\n" +
                "                      <div class=\"summary\" id=\"description-task\">\n" +
                "                                    "+task.description +
                "                      </div>\n" +
                "                 </div>\n" +
                "             </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "    <div class=\"extra content auto-center-row\" style=\"justify-content: space-between\">\n" +
                "        <div>\n" +
                "             <button class=\"ui icon button\" data-status=\"toDoingfromDone\" data-key=\"" + task.id + "\" >\n" +
                "                 <i class=\"arrow alternate circle left icon\"></i>\n" +
                "             </button>\n" +
                "             <button class=\"ui disabled icon button\">\n" +
                "                 <i class=\"arrow alternate circle right icon\"></i>\n" +
                "             </button>\n" +
                "        </div>\n" +
                "   <div> \n" +
                "</div>\n" +
                "</div>\n" +
                "\n" +
                "</div>"
			);
        }

        this.nextStatus = function (key,title,description,status,listOrigin,listDestiny) {

			self.task = {
				'id' : key,
				'title': title,
				'description' : description,
				'method' : 'mod',
				'status' : status
			}


			dao.modifyTask(self.task,
				function (task) {

					$('#'+ listOrigin +' #'+key).remove();
					if(listDestiny == 'listDoing' & listOrigin == 'listToDo')
						self.doingTask(self.task);
					else if(listDestiny == 'listToDo' & listOrigin == 'listDoing')
						self.newTask(self.task);
					else if(listDestiny == 'listDoing' & listOrigin == 'listDone') {

                        self.doingTask(self.task);
                    }
					else
						self.doneTask(self.task);
				},
				showErrorMessage
			);
        }

	};


	var showErrorMessage = function(jqxhr, textStatus, error) {
		alert(textStatus + ": " + error);
	};


	return TaskView;
})();