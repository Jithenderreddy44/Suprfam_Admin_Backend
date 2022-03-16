import {createShortLink} from './common.service';

export const generateCommunityLink = async (community_id:any) =>
{
    // try
    // {
    if(!community_id)
    {
        throw new Error("Community Id is required!");
    }

    let url = `https://suprfam.com/join?community=${community_id}`;
    console.log(url);
    const shortLink = await createShortLink(url);
    
    return shortLink; 
    
};