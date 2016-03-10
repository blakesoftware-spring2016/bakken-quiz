#!/usr/bin/env python

import SimpleHTTPServer
import SocketServer

PORT = 8080

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "Now serving bakken-quiz at http://localhost:" + str(PORT)
httpd.serve_forever()
