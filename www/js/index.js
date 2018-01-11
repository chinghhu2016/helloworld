/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var client;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var self = this;
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        var connectedElement = parentElement.querySelector('.connected');
        if (id === 'connected') {
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:none;');
            connectedElement.setAttribute('style', 'display:block;');
        } else if (id === 'deviceready') {
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            // var client  = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')
            // var client  = mqtt.connect('ws://test.mosquitto.org:8080/mqtt')
            var msgElement = document.getElementById('messagebox');
            client = mqtt.connect('ws://iot.eclipse.org:80/ws')
            console.log("connecting...")
            client.on('connect', function () {
                self.receivedEvent('connected');
                client.subscribe('presence')
                client.publish('presence', 'Hello mqtt')
                var messageElement = document.getElementById("messagebox");
                messageElement.setAttribute('style', 'display:block;');
                console.log("connected")
            })

            client.on('message', function (topic, message) {
               // message is Buffer
               console.log(message.toString())
               var messageElement = document.getElementById("messagebox");
               messageElement.innerHTML = message.toString();
               // client.end()
            })
        }

        console.log('Received Event: ' + id);
    }
};
