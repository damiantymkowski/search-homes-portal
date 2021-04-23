FROM phpdockerio/php7-cli

# Install FPM
RUN apt-get update \
    && apt-get -y --no-install-recommends install php-fpm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# File permissions workaround
RUN usermod -u 1000 www-data

# PHP-FPM packages need a nudge to make them docker-friendly
COPY overrides.conf /etc/php/7.0/fpm/pool.d/z-overrides.conf

# PHP-FPM has really dirty logs, certainly not good for dockerising
# The following startup script contains some magic to clean these up
COPY php-fpm-startup /usr/bin/php-fpm
CMD /usr/bin/php-fpm
RUN docker-php-ext-install pdo pdo_mysql
# for mysqli if you want
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli