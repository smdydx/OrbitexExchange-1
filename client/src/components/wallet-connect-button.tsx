import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useChainId } from "wagmi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { shortenAddress } from "@/lib/utils";
import { metaMask } from "wagmi/connectors";
import { bscTestnet } from 'viem/chains';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connectAsync, isPending } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      const connector = metaMask();
      await connectAsync({ connector });

      await window.ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });
    } catch (err: any) {
      console.error("Connection error:", err);
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: err?.message || "Could not connect to MetaMask",
      });
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
      toast({
        title: "Disconnected",
        description: "Wallet disconnected successfully",
      });
    } catch (err: any) {
      console.error("Disconnect error:", err);
    }
  };

  if (!isConnected) {
    return (
      <Button 
        onClick={handleConnect} 
        className="bg-primary hover:bg-primary/90 text-white"
        disabled={isPending}
      >
        {isPending ? "Connecting..." : "Connect MetaMask"}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {shortenAddress(address || "")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleDisconnect}>
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}