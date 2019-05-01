import torch
from torch import nn
from torch.autograd import Variable
from torch import optim
import torch.nn.functional as F
"""
part of the throught come from
https://blog.usejournal.com/stock-market-prediction-by-recurrent-neural-network-on-lstm-model-56de700bff68
https://stackoverflow.com/questions/48302810/whats-the-difference-between-hidden_weight-and-output-in-pytorch-lstm
https://www.kaggle.com/pablocastilla/predict-stock-prices-with-lstm
https://github.com/llSourcell/How-to-Predict-Stock-Prices-Easily-Demo/blob/master/lstm.py
https://raw.githubusercontent.com/chandlerzuo/chandlerzuo.github.io/master/codes/da_rnn/DA_RNN.py
"""
class decoder(nn.Module):
    """ Constructor of the decoder  
    Decode the information from the encoder layer and train the model
    input are design parameters that can be used to define the LSTM model
    """
    def __init__(self, input_size, output_size, time_step):
        super(decoder, self).__init__()
        self.time_step = time_step
        self.input_size = input_size
        self.output_size = output_size

        self.tuning = nn.Sequential(nn.Linear(2 * output_size + input_size, input_size),
                                         nn.Tanh(), nn.Linear(input_size, 1))
        self.lstm_layer = nn.LSTM(input_size = 1, hidden_size = output_size)
        self.fc = nn.Linear(input_size + 1, 1)
        self.fc1 = nn.Linear(output_size + input_size, 1)

    """ Pass forward the input_data """
    def forward(self, input_data, y_data):
        hidden = Variable(input_data.data.new(1, input_data.size(0), self.output_size).zero_())
        cell = Variable(input_data.data.new(1, input_data.size(0), self.output_size).zero_())
        for T in range(self.time_step - 1):
            # Concatenate the result by the end of the output and change size
            # Unlike expand(), repeat function copies the tensor’s data.
            x = torch.cat((hidden.repeat(self.time_step - 1, 1, 1).permute(1, 0, 2),
                           cell.repeat(self.time_step - 1, 1, 1).permute(1, 0, 2), input_data), dim = 2)
            x = F.softmax(self.tuning(x.view(-1, 2 * self.output_size + self.input_size
                                                )).view(-1, self.time_step - 1))
            # Performs a batch matrix-matrix product of matrices stored in batch1 and batch2.
            context = torch.bmm(x.unsqueeze(1), input_data)[:, 0, :] 
            if T < self.time_step - 1:
                y_tilde = self.fc(torch.cat((context, y_data[:, T].unsqueeze(1)), dim = 1))
                self.lstm_layer.flatten_parameters()
                _, lstm_output = self.lstm_layer(y_tilde.unsqueeze(0), (hidden, cell))
                hidden = lstm_output[0] 
                cell = lstm_output[1]
        y_pred = self.fc1(torch.cat((hidden[0], context), dim = 1))
        return y_pred