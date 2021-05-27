cd /usr/local/src/
wget https://www.openssl.org/source/openssl-1.1.1g.tar.gz 
tar -xf openssl-1.1.1g.tar.gz
cd openssl-1.1.1g
./config -Wl,--enable-new-dtags,-rpath,'$(LIBRPATH)'
make
make install
cd
mkdir local_ssl
cd local_ssl
touch ssl.conf
echo -e '[req]\ndistinguished_name = req_distinguished_name\nx509_extensions = v3_req\nprompt = no\n[req_distinguished_name]\nC = **Country**\nST = **State**\nL = **City**\nO = **Organization name**\nOU = **Department**\nCN = **Certificate Issuer**\n[v3_req]\nkeyUsage = keyEncipherment, dataEncipherment\nextendedKeyUsage = serverAuth\nsubjectAltName = @alt_names\n[alt_names]\nDNS.1 = **Domain name**\n' > ssl.conf
openssl req -x509 -nodes -days 1024 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -config ssl.conf -extensions 'v3_req'
cp localhost.crt /etc/ssl/certs/localhost.crt
cp localhost.key /etc/ssl/private/localhost.key
mkdir -p $HOME/.pki/nssdb
certutil -d $HOME/.pki/nssdb -N
certutil -d sql:$HOME/.pki/nssdb -A -t "CT,c,c" -n "localhost" -i localhost.crt
