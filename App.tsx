import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';

const projectId = 'YOUR_PROJECT_ID';

const providerMetadata = {
  name: 'YOUR_PROJECT_NAME',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

function App() {
  const [messageSigned, setMessageSigned] = useState<boolean | undefined>(
    undefined,
  );
  const {address, open, isConnected, provider} = useWalletConnectModal();

  const handleConnection = () => {
    if (isConnected) {
      return provider?.disconnect();
    }

    return open();
  };

  const signMessage = async () => {
    try {
      await provider?.request({
        method: 'personal_sign',
        params: ['message to sign', address],
      });

      setMessageSigned(true);
    } catch (error) {
      setMessageSigned(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={handleConnection}
        title={isConnected ? 'Disconnect' : 'Connect'}
      />

      {isConnected && (
        <>
          <Text style={styles.text}>{address}</Text>
          <Button onPress={signMessage} title="Sign message" />

          {messageSigned !== undefined && (
            <Text style={styles.text}>
              {messageSigned === true ? 'Message Signed' : 'Message not signed'}
            </Text>
          )}
        </>
      )}

      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    padding: 40,
    textAlign: 'center',
  },
});

export default App;
