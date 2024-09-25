requirements:
	pip install -r requirements.txt

lib:
	pipreqs --force .

env:
	source desactivate
	python3 -m venv algo/env
	source algo/env/bin/activate

fastapi:
	uvicorn main:app --reload