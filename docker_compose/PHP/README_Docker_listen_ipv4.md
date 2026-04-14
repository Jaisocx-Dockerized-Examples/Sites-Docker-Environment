
`Network`

# in docker server listen ip address

  > pool_workspace.conf: listen=ip:port. 
  > 
  > only "0.0.0.0:\${PHP_FPM_FLAT_PORT}" does. 
  > 
  > I've tried both 127.0.0.1 and $PHP_COMPOSER_IPv4.

  **Whether in docker a server can listen on the loopback ipv4 address 127.0.0.1**

  **Yes**, in Docker, a server inside a container can listen on the loopback IPv4 address 127.0.0.1. 
  However, by default, when you publish ports using the -p option (e.g., docker run -p 8080:80 nginx), 
  Docker maps the container port to all host addresses (0.0.0.0), 
  and makes it accessible from outside the host.

  If you want to restrict access 
  so that the published port is only accessible from the Docker host 
  (i.e., bound to 127.0.0.1), 
  you can specify the loopback address explicitly when publishing the port:

  ```bash
    docker run -d -p 127.0.0.1:8080:80 nginx
  ```

  This binds the container's port 80 to 127.0.0.1:8080 on the host, 
  so only processes on the host can access it.

  You can also configure the Docker daemon or user-defined bridge networks to use 127.0.0.1 
  as the default binding address for published ports, 
  and makes all published ports accessible only from the host by default.
  




