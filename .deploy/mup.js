module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '51.68.126.115',
      username: 'root',
      // pem: './path/to/pem'
      password: 'MCGadios20?'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'myclassgame',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://www.myclassgame.tk',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },
  proxy: {
    domains: 'myclassgame.tk,www.myclassgame.tk',
    //domains: 'www.myclassgame.tk',
    ssl: {
      // Enable let's encrypt to create free certificates.
      // The email is used by Let's Encrypt to notify you when the
      // certificates are close to expiring.
      letsEncryptEmail: 'myclassgame@gmail.com',
	  forceSSL:true
    }
  }

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mywebsite.com,www.mywebsite.com',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'email@domain.com'
  //   }
  // }
};
