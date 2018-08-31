#!/bin/sh

DIR=./assets/images

for file in $(find $DIR -name *.png -or -name *.gif -or -name *.jpg)
	do
	echo "require ('$file'),"
	done
