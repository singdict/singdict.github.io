import sys, os, string, json
from github import Github
from github import Auth
from tqdm import tqdm

def get_github_token():
	GH_ACCESS_TOKEN_FILEPATH = '.github_access_token'
	token = Auth.Token(open(GH_ACCESS_TOKEN_FILEPATH).read().strip())
	return token

def get_word_files(repo):
	contents = repo.get_contents('')
	word_files = []
	while contents:
		file_content = contents.pop(0)
		if file_content.type == 'dir':
			contents.extend(repo.get_contents(file_content.path))
		elif file_content.path.startswith('vocabulary/'):
			word_files.append(file_content)
	return word_files

if __name__ == '__main__':
	token = get_github_token()
	github = Github(auth=token)
	repo = github.get_repo('singdict/SingDict')
	word_files = get_word_files(repo)
	vocab = dict()
	for word in tqdm(word_files):
		path = word.path
		filename = os.path.split(path)[-1]
		initial = filename[0].lower()
		vocab[initial] = vocab.get(initial, []) + [word]
	
	for letter in string.ascii_lowercase:
		if letter not in vocab: continue
		entries = vocab[letter]
		jl_ret_for_letter = []
		for entry in entries:
			entry = json.loads(entry.decoded_content.decode())
			word = entry['Word']
			definition = entry['Definition']
			example = entry['Example']
			origin = entry['Origin']
			pron = entry['Pronunciation']

			jo = {'word':word, 'forms': [], 'origin': origin, 'pron': pron, 'defs': [{'def': definition, 'examples': [example]}], 'otherForms': []}

			if 'POS' in entry:
				# TODO need to process words those have multiple POSes
				jo['POS'] = entry['POS']

			jl_ret_for_letter.append(jo)

		with open('src/data/words/{}.ts'.format(letter), 'w') as ofp:
			ret_str = '''
import type {{ WordSchema }} from '../../model/wordsSchema';

export default {} as WordSchema[];'''.format(jl_ret_for_letter)
			ofp.write(ret_str)
		
