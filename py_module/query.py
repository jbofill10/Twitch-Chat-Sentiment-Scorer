from googleapiclient import discovery
import dotenv, os, json
dotenv.load_dotenv()


def query(message):

    API_KEY = os.getenv('API_KEY')

    # Generates API client object dynamically based on service name and version.
    service = discovery.build('commentanalyzer', 'v1alpha1', developerKey=API_KEY)
    print(message)
    analyze_request = {
        'comment': {'text': message},
        'requestedAttributes': {'TOXICITY': {}}
    }

    response = service.comments().analyze(body=analyze_request).execute()

    return response
