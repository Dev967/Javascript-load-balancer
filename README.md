
# Load Balancing Simulator
This program simulates computing in a Load Balancer environment using Node JS and Socket IO.
Initially built for a hackathon the above project is a great for understanding the various concepts of Distributed computing and Load Balancing.

The problem statement is as follows: there is a database that is being updated in realtime, in the records contains user action. The objective is to show realtime frequency of each action. e.g. event1: 10, event2: 2, event3: 45.

![](assets/dist-computing-simulator.png)

# Working
There are two main components of this project
1. Proxy nodes
2. Worker nodes

## Proxy Node 
The proxy nodes acts as proxy between actual worker nodes and endpoint requests. The proxy node keeps constantly polling the database, looking for updates upon receiving several records it assigns a worker to parse data and update the count. The proxy node keeps track of worker status using a Javascript Map datastructure and if a worker node is still in proecss while new data is received, it is sent to different worker node.

## Worker Node:
Worker node are used for heavy duty work that may take time to complete, in this case parsing data. Worker nodes iterate over the data records received from proxy node and parse each record for required data, finally they sum up and return results to proxy node. All communication is done using sockets and Socket IO framework. 
