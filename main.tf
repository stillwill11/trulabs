resource "aws_vpc" "my-vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name = "dev"


  }

}

resource "aws_subnet" "my-public_subnet" {
  vpc_id                  = aws_vpc.my-vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1a"
  tags = {
    Name = "dev-public"
  }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.my-vpc.id

  tags = {
    Name = "dev-gw"
  }
}

resource "aws_route_table" "my-vpc_rt" {
  vpc_id = aws_vpc.my-vpc.id

 route = []
  tags = {
    Name = "dev-my-vpc_rt"
  }
}

resource "aws_route" "r" {
  route_table_id            = "aws_route_table. my-vpc_rt.id"
  destination_cidr_block    = "0.0.0.0/0"
  gateway_id = aws_internet_gateway.gw.id

}

resource "aws_security_group" "my-vpc_tls" {
  name        = "dev_tls"
  description = "Allow TLS inbound traffic"
  vpc_id      = aws_vpc.my-vpc.id

  ingress {
    description      = "TLS from VPC"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
   
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

 }


 resource "aws_key_pair" "tokyo_auth"{
  key_name = "tokyo"
  public_key= file("~/.ssh/tokyo.pub")
 }

 resource "aws_instance" "dev_node" {
  instance_type = "t2.micro"
 ami = data.aws_ami.server_ami.id

tags= {
  name= "dev-node"
}
key_name = aws_key_pair.tokyo_auth.id

vpc_security_group_ids = [aws_security_group.my-vpc_tls.id]
subnet_id = aws_subnet.my-public_subnet.id
 
 root_block_device {
   volume_size = 10
 }
 
 }