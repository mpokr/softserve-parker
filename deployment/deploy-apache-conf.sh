#!/bin/bash -e

echo "================================================================"
echo "Deploying Apache configuration..."
echo "================================================================"
sudo cp apache/001-parker.conf /etc/apache2/sites-available/
sudo a2ensite 001-parker.conf
sudo service apache2 reload
