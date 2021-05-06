import { useSession, signIn } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps{
    priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps){
    const [session] = useSession();

    async function handleSubscribe(){
        console.log("passou-1");
        if(!session){
            console.log("passou0")
            signIn('github')  
            return;
        }
        
        try{
            console.log("passou1");
            const response = await api.post('/subscribe');
            console.log("passou2");
            const {sessionId} = response.data;

            const stripe = await getStripeJs();
            console.log("passou3");
            await stripe.redirectToCheckout({sessionId});
            
        } catch(err){
            alert(err.message);
        }

    }

    return(
        <button 
            type="button" 
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    );
}