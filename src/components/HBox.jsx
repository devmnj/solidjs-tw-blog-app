  import styles from './HBox.module.css';
export default function HBox(props) {
  return (
    <>
        <div class={styles.box  }>

<div  class={styles.content }>
  <p>
     {props.caption || 'H1'  } 
  </p>
</div>
<div  class={styles.contenthover2 } >
<a  href={`/tag/${props.caption}`} >

    <h1>{props.innerCaption || 'H1'}</h1>
    <p>
       {props.description || ''}
    </p>
</a>
</div>

</div>
    </>
  );
}
