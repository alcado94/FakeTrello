var BoardView = (function() {
	var dao;

	var self;


	function BoardView(boardDao) {
		dao = boardDao;
		self = this;
		board = "";

		this.init = function() {

			boards = dao.boards;
			// La acción por defecto de enviar formulario (submit) se sobreescribe
			// para que el envío sea a través de AJAX

			$('#addFormBoard').submit(function(event) {

				self.board = self.postBoard();

                dao.addBoard(self.board,
                    function(board) {

                		self.newBoard(self.board);

						self.resetForm();
                    },
                    showErrorMessage
                );
				console.log(self.board);

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

		this.postBoard = function() {
			var form = $('#addFormBoard');

			return {
				'title': form.find('input[name="title"]').val()
			};
		};

		this.putTask = function() {
			var form = $('#modFormTask');

			return {
				'id' : form.find('input[name="key"]').val(),
				'method' : form.find('input[name="method"]').val(),
				'title': form.find('input[name="title"]').val(),
				'description': form.find('textarea[name="description"]').val(),
				'status': form.find('input[name="status"]').val()
			};
		};

		this.delTask = function() {
			var form = $('#delFormTask');

			return {
				'method' : form.find('input[name="method"]').val(),
				'id' : $('#delid').attr('value')
			};
		};


		this.resetForm = function() {
			$('#addFormBoard').find('input[name="title"]').val('');
		};

		this.deleteTask = function(id) {
			$('#'+id.id).remove();
		};

		this.reloadTask = function (task){
			card = $('#'+task.id);

			card.find('#title-task').text(task.title);
		};

		this.newBoard = function (board) {
			$( "<a class=\"card\">\n" +
                "                <div class=\"content\">\n" +
                "                    <div class=\"header\">" + board.title + "</div>\n" +
                "                    <div class=\"meta\"></div>\n" +
                "                    <div class=\"description\">\n" +
                "                        &nbsp;\n" +
                "\n" +
                "                        &nbsp;\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </a>" ).insertBefore( "#addFormBoard" );
        }

	};


	var showErrorMessage = function(jqxhr, textStatus, error) {
		alert(textStatus + ": " + error);
	};


	return BoardView;
})();