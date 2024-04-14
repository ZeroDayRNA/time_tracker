FROM python:3.12-bullseye
ENV PYTHONUNBUFFRED=1
WORKDIR /timetracker
COPY . .
RUN pip install -r requirements.txt
EXPOSE 8000