import itertools
import torch
from torch import nn
from torch.autograd import Variable
from torch import optim
import torch.nn.functional as F
from encoder import encoder
from decoder import decoder
import pandas as pd
import numpy as np
"""
part of the throught come from
https://blog.usejournal.com/stock-market-prediction-by-recurrent-neural-network-on-lstm-model-56de700bff68
https://stackoverflow.com/questions/48302810/whats-the-difference-between-hidden_weight-and-output-in-pytorch-lstm
https://www.kaggle.com/pablocastilla/predict-stock-prices-with-lstm
https://github.com/llSourcell/How-to-Predict-Stock-Prices-Easily-Demo/blob/master/lstm.py
https://raw.githubusercontent.com/chandlerzuo/chandlerzuo.github.io/master/codes/da_rnn/DA_RNN.py
"""

""" Hyper-parameters that need hand modify """
batch_size = 128
output_dim = 1
num_layers=2
dropoutRate = 0.5
Learning_rate = 0.01
Num_Epochs = 100
file = ""
class LSTM_predicator:
	""" Use Adam as a optimizer to predict the next  """
	def __init__(self, file, encoder_hidden_size = 32, decoder_hidden_size = 32, time_step = 10, learning_rate = 0.01):
		# Take in the parameters
		self.time_step = time_step
		data = pd.read_csv(file)
		self.X = data.loc[:, [x for x in data.columns.tolist() if x != 'NDX']].as_matrix()
		self.y = np.array(data.NDX)
		self.batch_size = batch_size
		self.encoder = encoder(input_size = self.X.shape[1], hidden_weight_size = encoder_hidden_size, time_step = time_step).cuda()
		self.decoder = decoder(input_size = encoder_hidden_size, output_size = decoder_hidden_size, time_step = time_step).cuda()

		# Define the optimizer for the encoder and decoder
		self.encoder_optimizer = optim.Adam(params = itertools.ifilter(lambda p: p.requires_grad, self.encoder.parameters()),lr = learning_rate)
		self.decoder_optimizer = optim.Adam(params = itertools.ifilter(lambda p: p.requires_grad, self.decoder.parameters()),lr = learning_rate)

		self.train_size = int(self.X.shape[0] * 0.7)
		self.y = self.y - np.mean(self.y[:self.train_size])

		def train(self, Num_epoch = 10):
			iter_per_epoch = int(np.ceil(self.train_size * 1. / self.batch_size))
			self.iter_losses = np.zeros(Num_epoch * iter_per_epoch)
			self.epoch_losses = np.zeros(Num_epoch)
			self.loss_func = nn.MSELoss()

			iteration = 0

			for i in range(Num_epoch):
				# Prevent Adam from overflowing
				for group in encoder_optimizer.param_groups:
					for p in group['params']:
						state = encoder_optimizer.state[p]
						if 'step' in state and state['step'] >= 1024:
							state['step'] = 1000
							perm_idx = np.random.permutation(self.train_size - self.T)
							j = 0
				# Prevent Adam from overflowing 
				for group in decoder_optimizer.param_groups:
					for p in group['params']:
						state = decoder_optimizer.state[p]
						if 'step' in state and state['step'] >= 1024:
							state['step'] = 1000
							perm_idx = np.random.permutation(self.train_size - self.T)
							j = 0
				while j < self.train_size:
					batch_idx = perm_idx[j:(j + self.batch_size)]
					X = np.zeros((len(batch_idx), self.T - 1, self.X.shape[1]))
					y_history = np.zeros((len(batch_idx), self.T - 1))
					y_target = self.y[batch_idx + self.T]

					for k in range(len(batch_idx)):
						X[k, :, :] = self.X[batch_idx[k] : (batch_idx[k] + self.T - 1), :]
						y_history[k, :] = self.y[batch_idx[k] : (batch_idx[k] + self.T - 1)]

					self.encoder_optimizer.zero_grad()
					self.decoder_optimizer.zero_grad()

					input_weighted, input_encoded = self.encoder(Variable(torch.from_numpy(X).type(torch.FloatTensor).cuda()))
					y_pred = self.decoder(input_encoded, Variable(torch.from_numpy(y_history).type(torch.FloatTensor).cuda()))

					y_true = Variable(torch.from_numpy(y_target).type(torch.FloatTensor).cuda())
					loss = self.loss_func(y_pred, y_true)
					loss.backward()

					self.encoder_optimizer.step()
					self.decoder_optimizer.step()
					# Get the loss function
					loss = loss.data[0]

					self.iter_losses[i * iter_per_epoch + j / self.batch_size] = loss
					j += self.batch_size
					iteration += 1
					# update the learning rate
					if iteration % 10000 == 0 and iteration > 0:
						for param_group in self.encoder_optimizer.param_groups:
							param_group['lr'] = param_group['lr'] * 0.9
						for param_group in self.decoder_optimizer.param_groups:
							param_group['lr'] = param_group['lr'] * 0.9

				self.epoch_losses[i] = np.mean(self.iter_losses[range(i * iter_per_epoch, (i + 1) * iter_per_epoch)])

io_dir = '~/nasdaq'
model = LSTM_predicator(file = 'nasdaq100_padding.csv'.format(io_dir), learning_rate = Learning_rate)
model.train(Num_epoch = 100)

