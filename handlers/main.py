#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import json
import string
import os
import random
from webapp2_extras import jinja2


from google.appengine.ext import ndb
from google.appengine.api import users



class User(ndb.Model):
    id_user = ndb.StringProperty(required=True)
    name = ndb.StringProperty(required=True)

class LoginHandler(webapp2.RequestHandler):
    def get(self):
        jinja = jinja2.get_jinja2(app=self.app)

        labels = {
            "user_login": users.create_login_url("/")
        }
        self.response.write(jinja.render_template("main.html", **labels))


class MainHandler(webapp2.RequestHandler):
    def get(self):

        user = users.get_current_user()

        if user:

            user_id = user.user_id()
            name_info = user.nickname()
            print(user_id)
            print(name_info)
            jinja = jinja2.get_jinja2(app=self.app)

            todo = [row.to_dict() for row in Task.query(Task.status == 'ToDo' , Task.owner == user_id)]
            doing = [row.to_dict() for row in Task.query(Task.status == 'Doing' , Task.owner == user_id)]
            done = [row.to_dict() for row in Task.query(Task.status == 'Done' , Task.owner == user_id)]

            data = {
                "tasksToDo": todo,
                "tasksDoing": doing,
                "tasksDone": done,
                "user" : user,
                "user_logout": users.create_logout_url("/")
            }

            self.response.write(jinja.render_template("index.html", **data))
        else:
            self.redirect('/login')


class TaskHandler(webapp2.RequestHandler):

    def get(self):

        user = users.get_current_user()
        user_id = user.user_id()
        name_info = user.nickname()

        jinja = jinja2.get_jinja2(app=self.app)

        todo = [row.to_dict() for row in Task.query(Task.status == 'ToDo' & Task.owner == user_id)]
        doing = [row.to_dict() for row in Task.query(Task.status == 'Doing' & Task.owner == user_id)]
        done = [row.to_dict() for row in Task.query(Task.status == 'Done' & Task.owner == user_id)]

        data = {
            "tasksToDo": todo,
            "tasksDoing": doing,
            "tasksDone": done
        }

        self.response.write(jinja.render_template("index.html", **data))

    def post(self):

        user = users.get_current_user()

        if user:
            method = self.request.get("method")

            user_id = user.user_id()
            name_info = user.nickname()

            if method == 'del':
                id = self.request.get('id')

                entity = ndb.Key(Task, id)

                entity.delete()
            elif method == 'mod':
                id = self.request.get('id')


                entity = ndb.Key(Task, id).get()

                entity.title = self.request.get('title')
                entity.description = self.request.get('description')
                entity.status = self.request.get('status')

                entity.put()

            else:
                title = self.request.get("title", "")
                description = self.request.get("description", "")
                status = "ToDo"

                def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
                    return ''.join(random.choice(chars) for _ in range(size))

                key = id_generator()

                if len(title) == 0 :
                    self.response.write("Se requiere un titulo")
                    return

                tarea = Task(title=title, description=description, status=status, key=key, owner=user_id, id=key)

                tarea.put()

                json_txt = json.dumps(tarea.to_dict())
                self.response.out.write(json_txt)
        else:
            self.redirect('/login')



class Task(ndb.Model):
    title = ndb.StringProperty(required = True)
    description = ndb.StringProperty(required = True)
    status = ndb.StringProperty(required = True)
    owner = ndb.StringProperty(required = True)
    key = ndb.StringProperty(required = True)

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/task/*', TaskHandler),
    ('/login', LoginHandler)
], debug=True)
