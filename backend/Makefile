SHELL	= /bin/sh

new-user: parse-params
	curl -X POST \
	-H "Content-Type: application/json" \
	-d '{"username": "$(username)", "email": "$(email)", "firstName": "$(firstName)", "lastName": "$(lastName)"}' \
	localhost:3000/users/new -w "\nStatus code: %{http_code}"

edit-user:	parse-params
	curl -X POST \
	-H "Content-Type: application/json" \
	-d '{"username": "$(username)", "email": "$(email)", "firstName": "Alex", "lastName": "Sanders"}' \
	localhost:3000/users/edit/$(id) -w "\nStatus code: %{http_code}"

get-user-by-email: parse-params
	curl 'localhost:3000/users?email=$(email)' -w "\nStatus code: %{http_code}"

parse-params:
	$(eval email ?= a@example.com)
	$(eval username ?= acsauk)
	$(eval firstName ?= Alexander)
	$(eval lastName ?= Saunders)
	$(eval id ?= 1)