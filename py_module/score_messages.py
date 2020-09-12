import psycopg2
import json
import dotenv, os, sys
import query

dotenv.load_dotenv()


def run():
    try:
        connection = psycopg2.connect(os.getenv('PSQL_CONNECTIONSTRING'))

        print('Connected to PostgreSQL!')

    except Exception as e:

        print(f'Could not connect to PostgreSQL\n\n{e}')
        sys.exit(0)

    with connection.cursor() as cursor:
        try:
            cursor.execute(
                f"SELECT id, message FROM {os.getenv('CHANNEL')} WHERE user_type != 'mod' "
                f"or user_type IS NULL "
                f"AND toxicity IS NULL;")

            rows = cursor.fetchall()
            for row in rows:
                id = row[0]
                message = row[1]
                while 1:
                    try:
                        toxicity = query.query(message)
                        tox_score = toxicity['attributeScores']['TOXICITY']['summaryScore']['value']
                        print(message, tox_score)
                        cursor.execute(f"UPDATE {os.getenv('CHANNEL')} SET toxicity = {tox_score} WHERE id = {id};")
                        connection.commit()

                        break
                    except Exception as error:
                        print(error)
                        continue



        except Exception as error:
            print(error)


if __name__ == '__main__':
    run()
