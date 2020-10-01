FROM python:3.8.0
# https://stackoverflow.com/questions/59309687/attributeerror-usr-lib-libgdal-so-1-undefined-symbol-ogr-f-getfieldasinteger

RUN apt-get update &&\
    apt-get install -y binutils libproj-dev gdal-bin

ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . /app/
WORKDIR /app/cms
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
