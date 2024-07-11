args=("$@")
export $(egrep -v '#' .env | xargs)
DATE=$(date +%d%H%M)
export FLASK_APP=./backend/index.py

#setup function WIP

run-backend() {
    cd backend
    pipenv run flask --debug run -h 0.0.0.0 -p $API_PORT
    cd ..
}

migrate() {
  cd database
  rm .mylogin.cnf
  printf "[client]\nhost=$DB_HOST\nuser=$DB_USER\npassword=$DB_ROOT_PWD" >> .mylogin.cnf
  rm index.sql
  cat src/schools.sql src/tables/schools > index.sql
  mysql --defaults-file=".mylogin.cnf" $DB_NAME < bundle/index.sql
  mysqldump --defaults-file=".mylogin.cnf" --routines $DB_NAME > ../dump/dump.sql
  cd ..
}

db-start() {
  cd database
  rm .mylogin.cnf
  printf "[client]\nhost=$DB_HOST\nuser=$DB_USER\npassword=$DB_ROOT_PWD" >> .mylogin.cnf
  mysql --defaults-file=".mylogin.cnf" $DB_NAME
  cd ..
}

$*