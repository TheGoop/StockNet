# System Requirements:
> ##### Python v3.7.3
> ##### Pip v19.0.3
> ##### Node.js v12.18.4 

# StockNet 

## MacOS Instructions

- Download tar.gz the desired release on Github into the working directory

- Open bash terminal and navigate to working directory containing tar.gz

- Enter the following commands into the terminal:

`tar -xzvf StockNet-X.X.tar.gz`

`cd StockNet-X.X`

`python -m venv env`

`echo export GOOGLE_APPLICATION_CREDENTIALS="./keys/stocknet-4a790-firebase-adminsdk-7kocx-f12acbcbc0.json" >> env/bin/activate`

`source env/bin/activate`

`pip install -r requirements.txt`

`npm i`

`python ./app.py`


- Without closing the current bash terminal, open another tab/window in bash terminal

- *Verify that the current working direction is StockNet-X.X*

- Run the following:

`npm start`



