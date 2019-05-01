import torch
from torch import nn
from torch.autograd import Variable
from torch import optim
import torch.nn.functional as F
"""
part of the throught come from
https://arxiv.org/pdf/1704.02971.pdf
https://blog.usejournal.com/stock-market-prediction-by-recurrent-neural-network-on-lstm-model-56de700bff68
https://stackoverflow.com/questions/48302810/whats-the-difference-between-hidden_weight-and-output-in-pytorch-lstm
https://www.kaggle.com/pablocastilla/predict-stock-prices-with-lstm
https://github.com/llSourcell/How-to-Predict-Stock-Prices-Easily-Demo/blob/master/lstm.py
https://raw.githubusercontent.com/chandlerzuo/chandlerzuo.github.io/master/codes/da_rnn/DA_RNN.py
"""
""" Hyper-parameters that need hand modify """
batch_size = 100
output_dim = 1
num_layers=2
dropoutRate = 0.5
Learning_rate = 0.01
Num_Epochs = 100
""" Constructor of the encoder	
Encode the information to the data and later put into the decoder of the model 
input are design parameters that can be used to define the LSTM model
"""
class encoder(nn.Module):
    def __init__(self, input_size, hidden_weight_size, time_step, num_layers=1, out_features = 1):
        super(encoder, self).__init__()
        self.hidden_weight_size = hidden_weight_size
        self.input_size = input_size
        self.time_step = time_step
        self.num_layers  = num_layers
        self.out_features = out_features

        # LSTM model as time-series model to predict the model
        self.LSTM = nn.LSTM(input_size = input_size, hidden_size = hidden_weight_size, num_layers = num_layers)
        # Over we define the output layer to be the outfeature of the linear model and as the input of the decoder
        self.fc = nn.Linear(2 * hidden_weight_size + time_step - 1, out_features)

    """ Pass forward the input_data """
    def forward(self, input_data):
            # Declare the necessary parameter for the training process
            weight = Variable(input_data.data.new(input_data.size(0), self.time_step - 1, self.input_size).zero_())
            encode_weight = Variable(input_data.data.new(input_data.size(0), self.time_step - 1, self.hidden_weight_size).zero_())
            hidden_weight = Variable(input_data.data.new(1, input_data.size(0), self.hidden_weight_size).zero_())
            cell_weight = Variable(input_data.data.new(1, input_data.size(0), self.hidden_weight_size).zero_())

            for T in range(self.time_step - 1):
                # Concatenate the result by the end of the output and change size
                # Unlike expand(), repeat function copies the tensor’s data.
                x = torch.cat((hidden_weight.repeat(self.input_size, 1, 1).permute(1, 0, 2),
                        cell_weight.repeat(self.input_size, 1, 1).permute(1, 0, 2), input_data.permute(0, 2, 1)), dim = 2)

                # change the size to fit into the fully connect nerual layer
                x = self.fc(x.view(-1, self.hidden_weight_size * 2 + self.time_step - 1))
                linear = F.softmax(x.view(-1, self.input_size))
                # mutiply the input with the batch size
                x = torch.mul(linear, input_data[:, T, :])
                self.layer.flatten_parameters()
                _, lstm_states = self.layer(x.unsqueeze(0), (hidden_weight, cell_weight))
                hidden_weight = lstm_states[0]
                cell_weight = lstm_states[1]
                weight[:, T, :] = x
                encode_weight[:, T, :] = hidden_weight
            return weight, encode_weight





