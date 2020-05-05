# Just Use Docker In Programming (JUDIP)

JUDIP is a tool designed to make the process of writing code easier by automating the management of code dependencies using Docker.

Docker makes it extremely simple to create runtime environments with preconfigured languages and their dependencies. So why not use it to build an IDE similar to VSCode.

The idea behind this IDE is that if you lets say want to run some java code. In any normal circumstance, you would need to install OpenJDK and set it up to work with your machine. And in the future, if you want to upgrade or downgrade the JDK, you would need to do that manually. And the same would be true for just about any additional language or framework you wish to use. In JUDIP however, the goal is that so long as you have git, node and docker installed, you will never have to worry about any of the things mentioned above and you can worry about just writing code in a consistent and predictable manner.

As of right, JUDIP is still in very early development stages and is not suitable for any kind of real work, but if you wish to try JUDIP, then you can do so by following the steps provided below:-

## Installation

JUDIP requires three tools to run on your machine: Git, NodeJS and Docker. (Git is used to manage the various language and framework templates that we are planning on releasing, NodeJS is the platform on which JUDIP is written in and runs on and Docker is the tool that will handle automation of environment generation and management)

To install all the necessary dependencies, we have provided a set of instructions (per OS) to do so:-

- on Ubuntu just run the following commands in the terminal

  ```bash
  # Make sure you have curl installed. If you don't run: sudo apt install curl

  # Install Git
  sudo apt install git

  # Install NodeJS and NPM
  curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash - && sudo apt-get install -y nodejs

  # Install JUDIP
  npm i -g judip-beta

  # Install Docker
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  ```

- on MacOS run the following commands to install Git and NodeJS (P.S: The following commands will install [HomeBrew](brew.sh), a very popular package manager for MacOS)

  ```bash
  # Installing Homebrew
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

  # Installing Git and Node
  brew install git node

  # Install JUDIP
  npm i -g judip-beta
  ```

  And follow the instruction on the [Official Docker Website](https://docs.docker.com/docker-for-mac/install/) to install Docker.

- on Windows, open powershell or command prompt as an administrator and run the following commands (P.S: The following commands will install [Chocolatey](chocolatey.org), a popular package manager for Windows)

  ```powershell
  # Installing Chocolatey
  Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
  # If on cmd, then execute
  # @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

  # Installing git and node
  choco install git nodejs -y

  # Install JUDIP
  npm i -g judip-beta

  # For Docker, if you are using Windows 10 Pro, then run
  choco install docker-desktop -y
  # If you are using any version of Windows other that Windows 10 Pro
  # Example: Windows 7,8,8.1 or Windows 10 Home. Then run
  # choco install docker-toolbox -y
  ```

## Usage

After installing the above dependencies, in order to use JUDIP, all you will need to do is create a simple txt file that looks like this:-

```txt
Example.txt

Officially in JUDIP, as of right now, only three languages are supported with more on the way: Python (2 and 3), JavaScript and Java

Any code you want to run can be put inside hash brackets #{}# and each bracket set requires a configuration to be set:-

For python, you can specify either python:2 or python:3 (You can also specify shorthand py instead of python such py:2)
#{python:2

print "Hello World (From Python 2.0)"

}#

#{python:3

print("Hello World (From Python 3.0)");

}#

For Javascript, You can specify javascipt, node, js or nodejs
#{node

console.log("Hello World (From NodeJS)");

}#

For Java, you must specify java:CLASSNAME. The CLASSNAME is important and must match the one you specified
#{java:CLASSNAME

public class CLASSNAME {
	public static void main(String[] args) {
		System.out.println("Hello World (From Java)");
	}
}

}#
```

After defining the above file, you can execute it using

```bash
judip-beta Example.txt
```

And you should see the following output

```bash
Hello World (From Python 2.0)
Hello World (From Python 3.0)
Hello World (From NodeJS)
Hello World (From Java)
```

## License

This library is licensed under the MIT License - check the [LICENSE](https://github.com/AkhileshNS/judip/blob/master/LICENSE) file for more details.
