# SecurePurse

SecurePurse is a React-based web application for securely managing cryptocurrency wallets. With SecurePurse, users can generate new wallets or import existing ones using a recovery phrase. The app is focused on security, displaying both private and public keys with options for safely copying them to the clipboard and toggling sensitive information visibility.

## Features

- **Generate Wallet**: Create a new wallet with generated private and public keys.
- **Import Wallet**: Enter an existing recovery phrase to regenerate wallet keys.
- **Toggle Visibility**: Show or hide private keys and recovery phrases for improved security.
- **Copy to Clipboard**: Easily copy private keys, public keys, and the recovery phrase.

## Installation

1. Ensure Node.js and npm are installed on your machine.
2. Clone the repository or add the component to your existing React project.
3. Install the required dependencies:

   ```bash
   npm install tweetnacl bip39 ed25519-hd-key @solana/web3.js sonner lucide-react
   ```
4. Import and use the `WalletGenerator` component in your project.

### State Management

- **`mnemonicWords`**: Stores the words of the recovery phrase.
- **`seed`**: Stores the seed derived from the mnemonic.
- **`privateKeys`**: Stores the generated private keys.
- **`publicKeys`**: Stores the generated public keys.
- **`showMnemonic`**: Boolean state to toggle the visibility of the recovery phrase.
- **`showPrivateKeys`**: Boolean state to toggle the visibility of private keys.

## How It Works

1. **Generating a Wallet**:

   - Generates a new mnemonic phrase and derives the corresponding seed.
   - Uses the seed to generate private and public keys.
   - Displays the generated keys and mnemonic phrase.

2. **Importing a Wallet**:

   - Optionally enter a recovery phrase to derive private and public keys.

3. **Visibility Toggle**:

   - Private keys and recovery phrases can be toggled between visible and censored (asterisks) for security.

4. **Clipboard Copy**:

   - Provides functionality to copy private keys, public keys, and the recovery phrase to the clipboard.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve SecurePurse.

## License

This project is licensed under the MIT License.
