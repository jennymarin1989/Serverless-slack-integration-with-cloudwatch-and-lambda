# Slack Integration with Cloudwatch and Lambda

This is a personal project I developed with the purpose of learning how to integrate Amazon Web Services with Slack using the Serverless Framework.



## Approach

Initially, I spent some time reading about Amazon Web Services and understanding the main features of the services. I made use of my personal aws account to experiment and practise with DynamoDB and Cloudwatch, setting up alarms and creating SNS topics to subscribe a resource, in this case a lambda.

Once I had some familiarity with the services on the console, I dedicated some time to look at the [Serverless Framework](https://serverless.com/framework/docs/getting-started/) and Serverless CLI deployment.



## Set up

1. Install the Serververless Framework: $npm install -g serverless

2. Config your aws credentials https://serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/

3. Clone the repo: $git clone https://github.com/jennymarin1989/Serverless-slack-integration-with-cloudwatch-and-lambda.git

4. On your AWS account create a SNS topic, copy the aws ARN and add it to the serverless.yml file

5. Set up a cloudwatch Alarm on any of your existing services and link the SNS topic e.g

![image](https://user-images.githubusercontent.com/29259526/72221857-5fdd0000-3556-11ea-9f4c-bbf236fe3a95.png)


6. Invoke the lambda and test the function locally: $ serverless invoke local --function alertService

7. Deploy the code to AWS by running $ serverless deploy. This command will generate an S3 bucket on your aws account with a serverless folder with the  cloudformation template of architecture.



## Architecture

![image](https://user-images.githubusercontent.com/29259526/72221808-e47b4e80-3555-11ea-8d40-27a6e0bdc594.png)




## How it works?

The aim of this project is to create a notification service where I can receive a slack notification/email if more than 1 item is created on a Dynamo DB table in less than 1 minute.

I have a DynamoDB set up in my account with a list of items, If I create a new item on the table and, If go over my Write Capacity Units limit (0.01 Average Units/Seconds in 1 minute) Cloudwatch will trigger an alarm to  send a message to an SNS topic. An existing lambda will be invoked by SNS and will  call the Slack API to post a message to a slack channel.

![image](https://user-images.githubusercontent.com/29259526/72223306-2364d080-3565-11ea-8395-cfbc901c3ef5.png)


In order to post messages to slack channel, I set up an Incoming WebHook integration in my slack workspace, [click here](https://api.slack.com/messaging/webhooks) to find the instructions.


## Stack

- Amazon Web Services: CloudWatch, DynamoDB, SNS, Lambda
- Serverless Framework and Serverless CLI
- Slack incoming webhook


## Author

Jenny Arenas
