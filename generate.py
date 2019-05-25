#!/usr/bin/python3
import base64
import numpy as np
import io
from io import BytesIO
from PIL import Image
import keras
from keras import backend as K
from random import randint
from keras.models import Sequential
from keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing.image import img_to_array
from flask import request
from flask import jsonify
from flask import Flask
import os

os.environ['KERAS_BACKEND']='tensorflow'

if os.environ['KERAS_BACKEND'] =='theano':
	channel_axis=1
	K.set_image_data_format('channels_first')
	channel_first = True
else:
	K.set_image_data_format('channels_last')
	channel_axis=-1
	channel_first = False

app = Flask(__name__)

def get_model():
	global fmodel, mmodel
	fmodel = load_model("./tjweigenfacades200.h5")
	fmodel._make_predict_function()
	print(" * Facade Model loaded!")
	
	##mmodel = load_model("./tjweigenmaps114.h5")
	##mmodel._make_predict_function()
	##print(" * Maps Model loaded!")
	
def preprocess_img(img, target_size):
	if(img.mode != "RGB"):
		img = img.convert("RGB")
	img = img.resize(target_size)
	img = img_to_array(img)
	img = np.expand_dims(img, axis=0)
	return img

def serve_pil_image(pil_img):
	img_io = BytesIO()
	pil_img.save(img_io, 'JPEG', quality=100)
	img_io.seek(0)
	return send_file(img_io, mimetype='image/jpeg')

def read_image(im):
	loadSize = 286
	imageSize = 256
	im = im.resize( (loadSize, loadSize), Image.BILINEAR )
	arr = np.array(im)/255*2-1
	arr = arr[:,:,:3]
	w1,w2 = (loadSize-imageSize)//2,(loadSize+imageSize)//2
	h1,h2 = w1,w2
	if(im.mode=='RGBA'):
		arr = arr[:,:,:3]
	imgA = arr[h1:h2, w1:w2, :]
	if channel_first:
		imgA = np.moveaxis(imgA, 2, 0)
	return imgA


print(" * Loading Keras model...")

@app.route("/generate",methods=['POST'])
def generate():
	print(" * Starting Generation!")
	message = request.get_json(force=True)
	encoded = message['image']
	decoded = base64.b64decode(encoded)
	image = Image.open(io.BytesIO(decoded))
	processed_img = read_image(image)#preprocess_img(image,target_size=(224,224))
	#np.float32(processed_img)
	processed_img = np.expand_dims(processed_img, axis=0)
	#print(processed_img.shape)
	prediction = fmodel.predict(processed_img)#.tolist()
	res_img = ( (prediction[0]+1)/2*255).clip(0,255).astype('uint8')
	res_img = Image.fromarray(res_img)
	#return serve_pil_image(res_img)	
	buffered = BytesIO()
	res_img.save(buffered, format="JPEG")
	response = {
		'generation': base64.b64encode(buffered.getvalue()).decode('utf-8')
	}
	print(" * Sending Result!")
	response=jsonify(response)
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response

@app.route("/mapify",methods=['POST'])
def mapify():
	print(" * Starting to Mapify!")
	message = request.get_json(force=True)
	encoded = message['image']
	decoded = base64.b64decode(encoded)
	image = Image.open(io.BytesIO(decoded))
	processed_img = read_image(image)#preprocess_img(image,target_size=(224,224))
	#np.float32(processed_img)
	processed_img = np.expand_dims(processed_img, axis=0)
	#print(processed_img.shape)
	prediction = mmodel.predict(processed_img)#.tolist()
	res_img = ( (prediction[0]+1)/2*255).clip(0,255).astype('uint8')
	res_img = Image.fromarray(res_img)
	#return serve_pil_image(res_img)	
	buffered = BytesIO()
	res_img.save(buffered, format="JPEG")
	response = {
		'generation': base64.b64encode(buffered.getvalue())
	}
	print(" * Sending Result!")
	return jsonify(response)

if __name__=="__main__":
	get_model()

	app.run(debug=True)